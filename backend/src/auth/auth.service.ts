import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";
import { SignupDto } from "./dto/signup.dto";
import * as bcrypt from "bcrypt";
import { SigninDto } from "./dto/signin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn({ username, password }: SigninDto) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new BadRequestException("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid password");
    }

    return this.generateTokens(new JwtPayloadDto(user));
  }

  async signUp({
    email,
    username,
    firstName,
    lastName,
    password,
    passwordConfirmation,
  }: SignupDto) {
    if (password !== passwordConfirmation) {
      throw new BadRequestException("Passwords do not match");
    }
    const isUsernameExists = await this.userService.isUsernameExists(username);
    if (isUsernameExists) {
      throw new ConflictException("Username already exists");
    }
    const isEmailExists = await this.userService.isEmailExists(email);
    if (isEmailExists) {
      throw new ConflictException("Email already exists");
    }

    const userData = {
      email: email.toLowerCase(),
      username,
      firstName,
      lastName,
      password: await bcrypt.hash(password, 10),
    };

    await this.userService.save(userData);
  }

  async generateTokens(payload: JwtPayloadDto) {
    const plainPayload = { ...payload };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(plainPayload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: "1h",
      }),
      this.jwtService.signAsync(plainPayload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: "14d",
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    let payload: JwtPayloadDto;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (err) {
      throw new BadRequestException();
    }
    const user = await this.userService.findById(payload.id);
    if (!user) {
      throw new BadRequestException();
    }
    return this.generateTokens(new JwtPayloadDto(user));
  }
}

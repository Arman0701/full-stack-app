import { Body, Controller, Get, Post, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { SignupDto } from "./dto/signup.dto";
import { SigninDto } from "./dto/signin.dto";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  async signIn(@Body() body: SigninDto) {
    return this.authService.signIn(body);
  }

  @Post("signup")
  async signUp(@Body() body: SignupDto) {
    console.log("body :::", body);
    return this.authService.signUp(body);
  }

  @Get("me")
  @UseGuards(AuthGuard("jwt"))
  async me(@Req() req) {
    return req.user;
  }

  @Post("refresh")
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refreshTokens(body.refreshToken);
  }
}

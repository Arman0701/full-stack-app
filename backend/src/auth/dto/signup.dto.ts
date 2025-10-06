import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { SigninDto } from './signin.dto';

export class SignupDto extends SigninDto {
  @MaxLength(255)
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @ApiProperty()
  passwordConfirmation: string;
}

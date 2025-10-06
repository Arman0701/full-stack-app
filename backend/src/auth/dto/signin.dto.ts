import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword, Length, Matches } from 'class-validator';

export class SigninDto {
  @Matches(/^[a-z0-9._]+$/)
  @Length(5, 255)
  @ApiProperty()
  username: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minSymbols: 0,
    minNumbers: 1,
    minUppercase: 1,
  })
  @ApiProperty()
  password: string;
}

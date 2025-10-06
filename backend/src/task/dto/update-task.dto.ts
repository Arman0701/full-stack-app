import { IsString, IsOptional, MinLength, IsEnum } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: "Title must be at least 3 characters long" })
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}

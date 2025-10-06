import { TaskStatus } from '@prisma/client';
import { IsString, IsOptional, MinLength, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

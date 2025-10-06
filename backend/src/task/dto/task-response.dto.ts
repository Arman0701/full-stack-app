import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';

export class TaskResponseDto {
  id: string;

  title: string;

  description: string | null;

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.PENDING })
  status: TaskStatus;

  userId: string;

  createdAt: Date;

  updatedAt: Date;
}

export class PaginatedTaskResponseDto {
  data: TaskResponseDto[];

  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

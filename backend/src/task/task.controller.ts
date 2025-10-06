import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';
import {
  TaskResponseDto,
  PaginatedTaskResponseDto,
} from './dto/task-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Request() req,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    const userId = req.user.id;
    return await this.taskService.create(userId, createTaskDto);
  }

  @Get()
  async findAll(
    @Request() req,
    @Query() queryDto: QueryTaskDto,
  ): Promise<PaginatedTaskResponseDto> {
    const userId = req.user.id;
    return await this.taskService.findAll(userId, queryDto);
  }

  @Get(':id')
  async findOne(
    @Request() req,
    @Param('id') id: string,
  ): Promise<TaskResponseDto> {
    const userId = req.user.id;
    return await this.taskService.findOne(userId, id);
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    const userId = req.user.id;
    return await this.taskService.update(userId, id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Request() req,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    const userId = req.user.id;
    return await this.taskService.remove(userId, id);
  }
}

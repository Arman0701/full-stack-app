import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { QueryTaskDto } from "./dto/query-task.dto";
import { Prisma, TaskStatus } from "@prisma/client";

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createTaskDto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status || TaskStatus.PENDING,
        userId,
      },
    });

    return task;
  }

  async findAll(userId: string, queryDto: QueryTaskDto) {
    const { status, page = 1, limit = 10 } = queryDto;

    const where: Prisma.TaskWhereInput = { userId };
    if (status) {
      where.status = status;
    }

    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      this.prisma.task.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: tasks,
      page,
      limit,
      total,
      totalPages,
    };
  }

  async findOne(userId: string, id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.userId !== userId) {
      throw new ForbiddenException("You do not have access to this task");
    }

    return task;
  }

  async update(userId: string, id: string, updateTaskDto: UpdateTaskDto) {
    await this.findOne(userId, id);

    const task = await this.prisma.task.update({
      where: { id },
      data: {
        ...(updateTaskDto.title && { title: updateTaskDto.title }),
        ...(updateTaskDto.description !== undefined && {
          description: updateTaskDto.description,
        }),
      },
    });

    return task;
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);

    await this.prisma.task.delete({
      where: { id },
    });

    return { message: "Task successfully deleted" };
  }
}

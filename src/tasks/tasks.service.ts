import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }
  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOneById(id, user);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = await this.taskRepository.create(createTaskDto, user);
    return task;
  }

  async deleteTaskById(id: number, user: User): Promise<void> {
    const deleteResult: DeleteResult = await this.taskRepository.deleteById(
      id,
      user,
    );
    if (!deleteResult.affected || deleteResult.affected == 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskStatusById(
    id: number,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const task: Task = await this.getTaskById(id, user);
    task.status = updateTaskStatusDto.status;
    await task.save();
    return task;
  }
}

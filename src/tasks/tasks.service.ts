import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }
  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.create(createTaskDto);
    return task;
  }

  async deleteTaskById(id: number): Promise<void> {
    const deleteResult: DeleteResult = await this.taskRepository.deleteById(id);
    if (!deleteResult.affected || deleteResult.affected == 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskStatusById(
    id: number,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const task: Task = await this.getTaskById(id);
    task.status = updateTaskStatusDto.status;
    await task.save();
    return task;
  }
}

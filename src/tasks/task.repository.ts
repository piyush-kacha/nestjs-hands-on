import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { User } from '../users/user.entity';
import { InternalServerErrorException } from '../exceptions/internal-server-error.exception';

@Injectable()
export class TaskRepository {
  private logger = new Logger('TaskRepository');
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { search, status } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (err) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(err);
    }
  }

  findOneById(id: number, user: User) {
    const options: FindOptionsWhere<Task> = { id, userId: user.id };
    return this.taskRepository.findOneBy(options);
  }

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.description = description;
    task.title = title;
    task.status = TaskStatus.OPEN;
    task.user = user;

    try {
      await this.taskRepository.save(task);
    } catch (err) {
      this.logger.error(
        `Failed to get task for user "${user.username}", Data: ${JSON.stringify(
          createTaskDto,
        )}`,
        err.stack,
      );
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(err);
    }

    delete task.user;
    return task;
  }

  async deleteById(id: number, user: User): Promise<DeleteResult> {
    return this.taskRepository.delete({ id, userId: user.id });
  }
}

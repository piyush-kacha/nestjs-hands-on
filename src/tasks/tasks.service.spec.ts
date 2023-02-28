import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOneById: jest.fn(),
  create: jest.fn(),
  deleteById: jest.fn(),
});

const mockUser: any = { id: 1, username: 'Piyush' };

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();
    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const filters: GetTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'NestJS',
      };
      const result = await tasksService.getTasks(filters, mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls taskRepository.findOneById() and successfully retrieve and return the task', async () => {
      const mockTask = { title: 'Test task', description: 'Test desc' };
      taskRepository.findOneById.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(1, mockUser);
      expect(result).toEqual(mockTask);

      expect(taskRepository.findOneById).toHaveBeenCalledWith(1, mockUser);
    });

    it('throws an error as task is not found', () => {
      taskRepository.findOneById.mockResolvedValue(null);
      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTask', () => {
    it('calls taskRepository.create() and returns the result', async () => {
      const mockTaskResult = {
        id: 1,
        title: 'Test task',
        description: 'Test desc',
        status: TaskStatus.IN_PROGRESS,
        userId: mockUser.id,
      };
      taskRepository.create.mockResolvedValue(mockTaskResult);
      expect(taskRepository.create).not.toHaveBeenCalled();

      const mockTask: CreateTaskDto = {
        title: 'Test task',
        description: 'Test desc',
      };

      const result = await tasksService.createTask(mockTask, mockUser);
      expect(result).toEqual(mockTaskResult);
      expect(taskRepository.create).toHaveBeenCalled();
    });
  });

  describe('deleteTask', () => {
    it('calls taskRepository.deleteTask() to delete a task', async () => {
      taskRepository.deleteById.mockResolvedValue({ affected: 1 });
      expect(taskRepository.deleteById).not.toHaveBeenCalled();
      await tasksService.deleteTaskById(1, mockUser);
      expect(taskRepository.deleteById).toHaveBeenCalledWith(1, mockUser);
    });

    it('throws an error as task could not be found', () => {
      taskRepository.deleteById.mockResolvedValue({ affected: 0 });
      expect(tasksService.deleteTaskById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateTaskStatusById', () => {
    it('updates a task status', async () => {
      const save = jest.fn().mockResolvedValue(true);
      tasksService.getTaskById = jest.fn().mockResolvedValue({
        status: TaskStatus.OPEN,
        save,
      });

      expect(tasksService.getTaskById).not.toHaveBeenCalled();

      const updateTaskStatusDto: UpdateTaskStatusDto = {
        status: TaskStatus.DONE,
      };

      const result = await tasksService.updateTaskStatusById(
        1,
        updateTaskStatusDto,
        mockUser,
      );
      expect(tasksService.getTaskById).toHaveBeenCalled();
      expect(save).toHaveBeenCalled();
      expect(result.status).toEqual(TaskStatus.DONE);
    });
  });
});

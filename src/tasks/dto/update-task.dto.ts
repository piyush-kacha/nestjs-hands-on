import { TaskStatus } from '../task-status.enum';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class UpdateTaskStatusDto {
  @ApiProperty({
    description: 'Task status',
    enum: TaskStatus,
  })
  status: TaskStatus;
}

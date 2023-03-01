import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetTasksFilterDto {
  @ApiPropertyOptional({
    description: 'Search filter with task status',
    enum: [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE],
  })
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @ApiPropertyOptional({
    description: 'Search filter with text',
  })
  @IsOptional()
  @IsNotEmpty()
  search: string;
}

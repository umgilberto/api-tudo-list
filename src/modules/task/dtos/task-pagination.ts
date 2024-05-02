import {
  BasePaginatedOutput,
  ListedObjects,
} from 'src/shareds/dtos/base-output.dto';
import { ApiProperty } from '@nestjs/swagger';
import { autoMapper } from 'src/shareds/utils';
import { TaskEntity } from '../entities';
import { TaskOutput } from './crud-task.dto';

export class GetTaskOutput
  extends BasePaginatedOutput
  implements ListedObjects<TaskOutput>
{
  constructor(data: TaskEntity[], total: number) {
    super({ total });
    this.data = data.map((item) => autoMapper(TaskOutput, item));
  }

  @ApiProperty({
    description: 'Listed sprints.',
    type: () => [TaskOutput],
  })
  data: TaskOutput[];
}

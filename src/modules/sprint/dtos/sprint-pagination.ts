import {
  BasePaginatedOutput,
  ListedObjects,
} from 'src/shareds/dtos/base-output.dto';
import { ApiProperty } from '@nestjs/swagger';
import { autoMapper } from 'src/shareds/utils';
import { SprintEntity } from '../entities';
import { SprintOutput } from './crud-sprint.dto';

export class GetSprintOutput
  extends BasePaginatedOutput
  implements ListedObjects<SprintOutput>
{
  constructor(data: SprintEntity[], total: number) {
    super({ total });
    this.data = data.map((item) => autoMapper(SprintOutput, item));
  }

  @ApiProperty({
    description: 'Listed sprints.',
    type: () => [SprintOutput],
  })
  data: SprintOutput[];
}

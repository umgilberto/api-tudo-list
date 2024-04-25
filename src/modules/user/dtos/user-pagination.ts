import {
  BasePaginatedOutput,
  ListedObjects,
} from 'src/shareds/dtos/base-output.dto';
import { UserOutput } from './crud-user.dto';
import { UserEntity } from '../entities';
import { ApiProperty } from '@nestjs/swagger';
import { autoMapper } from 'src/shareds/utils';

export class GetUserOutput
  extends BasePaginatedOutput
  implements ListedObjects<UserOutput>
{
  constructor(data: UserEntity[], total: number) {
    super({ total });
    this.data = data.map((item) => autoMapper(UserOutput, item));
  }

  @ApiProperty({
    description: 'Listed users.',
    type: () => [UserOutput],
  })
  data: UserOutput[];
}

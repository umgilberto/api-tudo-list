import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import { BaseIdDto } from 'src/shareds/dtos';

export class SprintDTO extends BaseIdDto {
  @ApiProperty({
    description: 'Sprint title.',
    maxLength: 30,
    example: 'Make a tudo-list',
  })
  @IsString()
  @Expose()
  title: string;

  @ApiProperty({
    description: 'Sprint sub title',
    maxLength: 100,
    example: 'The goal of the sprint is to create a todo-list',
  })
  @IsString()
  @Expose()
  subTitle: string;

  @ApiProperty({
    description: 'Sprint sub title',
    maxLength: 10,
    example: 'Sprint 01',
  })
  @IsString()
  @Expose()
  slug: string;

  @ApiProperty({
    description: 'Sprint start date.',
    example: '2024-05-01 23:02:23.505',
  })
  @IsDate()
  @Expose()
  startDate: Date;

  @ApiProperty({
    description: 'Sprint end date.',
    example: '2024-05-01 23:02:23.505',
  })
  @IsDate()
  @Expose()
  endDate: Date;
}

export class UpdateSprintInput extends SprintDTO {}

export class SprintPaginationOutput {
  data: SprintOutput[];
  total: number;
}
export class SprintOutput extends SprintDTO {}

export class CreateSprintInput extends PartialType(
  OmitType(SprintDTO, ['id']),
) {}

export class DeleteSprintInput {
  @ApiProperty({
    description: 'Successfully deleted sprint response.',
    example: '2b082113-9545-4582-8578-f45c63dc9ae0',
  })
  @IsString()
  id: '2b082113-9545-4582-8578-f45c63dc9ae0';
}

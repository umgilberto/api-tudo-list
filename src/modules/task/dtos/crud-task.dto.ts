import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { BaseIdDto } from 'src/shareds/dtos';
import { TaskTagsEnum } from 'src/shareds/enums/taskTags.enum';
import { TaskTypesEnum } from 'src/shareds/enums/taskTypes.enum';

export class TaskDTO extends BaseIdDto {
  @ApiProperty({
    description: 'Task title.',
    maxLength: 30,
    example: 'Fix a auth module',
  })
  @IsString()
  @Expose()
  title: string;

  @ApiProperty({
    description: 'Task sub title',
    maxLength: 100,
    example: 'The goal of the card is fix a auth module',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Task sub title',
    maxLength: 10,
    example: 'TL-01',
  })
  @IsString()
  @Expose()
  slug: string;

  @ApiProperty({
    description: 'Task tags',
    example: ['backend'],
  })
  @IsOptional()
  @IsArray()
  @Expose()
  tags: TaskTagsEnum[];

  @ApiProperty({
    description: 'Task type',
    example: TaskTypesEnum.feat,
    enum: TaskTypesEnum,
  })
  @Expose()
  type: TaskTypesEnum;
}

export class UpdateTaskInput extends TaskDTO {}

export class TaskPaginationOutput {
  data: TaskOutput[];
  total: number;
}
export class TaskOutput extends TaskDTO {}

export class CreateTaskInput extends PartialType(OmitType(TaskDTO, ['id'])) {}

export class DeleteTaskInput {
  @ApiProperty({
    description: 'Successfully deleted sprint response.',
    example: '2b082113-9545-4582-8578-f45c63dc9ae0',
  })
  @IsString()
  id: '2b082113-9545-4582-8578-f45c63dc9ae0';
}

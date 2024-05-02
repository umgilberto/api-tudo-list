import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { CustomBaseEntity } from 'src/shareds/entity';
import { TaskTagsEnum } from 'src/shareds/enums/taskTags.enum';
import { TaskTypesEnum } from 'src/shareds/enums/taskTypes.enum';
import { SprintEntity } from 'src/modules/sprint';

@Entity({ name: 'task' })
export class TaskEntity extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    length: 30,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'enum',
    nullable: true,
    enum: TaskTagsEnum,
    array: true,
  })
  tags?: TaskTagsEnum[];

  @Column({
    type: 'enum',
    enum: TaskTypesEnum,
    default: TaskTypesEnum.feat,
  })
  type: TaskTypesEnum;

  @ManyToOne('sprint', 'cards')
  sprint: Relation<SprintEntity>;
}

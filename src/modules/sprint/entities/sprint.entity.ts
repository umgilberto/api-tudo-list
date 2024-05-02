import { Column, Entity, OneToMany } from 'typeorm';
import { CustomBaseEntity } from 'src/shareds/entity';
import { TaskEntity } from 'src/modules/task';

@Entity({ name: 'sprint' })
export class SprintEntity extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    length: 30,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  subTitle: string;

  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'date',
  })
  startDate: Date;

  @Column({
    type: 'date',
  })
  endDate: Date;

  @OneToMany(() => TaskEntity, (task) => task.sprint)
  cards: TaskEntity[];
}

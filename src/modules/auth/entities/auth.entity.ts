import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { CustomBaseEntity } from 'src/shareds/entity';
import { UserEntity } from 'src/modules/user';

@Entity({ name: 'auth' })
export class AuthEntity extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  token: string;

  @ManyToOne('user', 'auth')
  user: Relation<UserEntity>;

  @Column({
    type: 'varchar',
  })
  expiresIn: string;
}

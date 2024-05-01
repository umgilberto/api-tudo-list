import { Column, Entity, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => UserEntity, (user) => user.auth)
  user: UserEntity;

  @Column({
    type: 'varchar',
  })
  expiresIn: string;
}

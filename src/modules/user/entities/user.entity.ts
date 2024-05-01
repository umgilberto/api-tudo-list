import { Column, Entity, OneToMany } from 'typeorm';
import { CustomBaseEntity } from 'src/shareds/entity';
import { AuthEntity } from 'src/modules/auth/entities';

@Entity({ name: 'user' })
export class UserEntity extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isMaster: boolean;

  @OneToMany(() => AuthEntity, (auth) => auth.user)
  auth: AuthEntity[];
}

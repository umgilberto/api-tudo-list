import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AuthEntity } from '../entities/auth.entity';

@Injectable()
export class AuthRepository extends Repository<AuthEntity> {
  constructor(private dataSource: DataSource) {
    super(AuthEntity, dataSource.createEntityManager());
  }
}

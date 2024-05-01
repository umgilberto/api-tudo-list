import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SprintEntity } from '../entities/sprint.entity';

@Injectable()
export class SprintRepository extends Repository<SprintEntity> {
  constructor(private dataSource: DataSource) {
    super(SprintEntity, dataSource.createEntityManager());
  }
}

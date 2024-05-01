import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SprintService } from './sprint.service';
import { SprintRepository } from './repositories';
import { SprintEntity } from './entities';
import { SprintController } from './sprint.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SprintEntity])],
  controllers: [SprintController],
  providers: [SprintService, SprintRepository],
  exports: [SprintRepository],
})
export class SprintModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskService } from './task.service';
import { TaskRepository } from './repositories';
import { TaskEntity } from './entities';
import { TaskController } from './task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskRepository],
})
export class TaskModule {}

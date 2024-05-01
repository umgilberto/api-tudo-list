import { Module } from '@nestjs/common';
import { internalModules } from './modules/internal.modules';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, ...internalModules],
  controllers: [],
  providers: [],
})
export class AppModule {}

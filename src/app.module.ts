import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database';
import { CommonModule } from './shareds/modules';
import { internalModules } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    CommonModule,
    ...internalModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

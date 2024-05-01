import { Module } from '@nestjs/common';
import { internalModules } from './modules/internal.modules';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database';
import { CommonModule } from './shareds/modules';

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

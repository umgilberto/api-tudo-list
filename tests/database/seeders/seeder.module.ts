import { Module } from '@nestjs/common';

import { UserSeederModule } from './modules';
import { SeederService } from './seeder.service';
import { DatabaseModule } from '../../../src/database';

@Module({
  imports: [DatabaseModule, UserSeederModule],
  providers: [SeederService],
})
export class SeederModule {}

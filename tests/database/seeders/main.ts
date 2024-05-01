import { NestFactory } from '@nestjs/core';

import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  app.get(SeederService);

  console.log('\nSeeder bootstraped!\nRunning queue...');
}

bootstrap();

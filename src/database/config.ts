import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { environment } from '../configs';

export const databaseConfig: DataSourceOptions & TypeOrmModuleOptions = {
  type: environment.database.type,
  host: environment.database.host,
  port: environment.database.port,
  username: environment.database.username,
  password: environment.database.password,
  database: environment.database.database,
  entities: ['dist/modules/**/*.entity.js'],
  migrations: ['dist/database/migrations/**/*.js'],
  ssl: false,
  migrationsRun: true,
  autoLoadEntities: true,
};

export const dataSource = new DataSource(databaseConfig);

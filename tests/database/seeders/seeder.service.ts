import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { UserSeed, UserSeederService } from './modules';

import { Seeder } from './seeder.base';
import { execSync } from 'child_process';

Injectable();
export class SeederService {
  constructor(
    @Inject(DataSource)
    private readonly dataSource: DataSource,
    @Inject(UserSeederService)
    private readonly userSeederService: UserSeederService,
  ) {}

  async seedMaster(user: UserSeed): Promise<void> {
    if (await this.userSeederService.createUser(user))
      console.log('\nMaster successfully seeded!');
    else console.log('\nError on seeding master. Maybe already exists?');
  }

  listTables(): string[] {
    const tables = this.dataSource.entityMetadatas
      .map((entity) => entity.tableName)
      .sort();

    return [...new Set(tables)];
  }

  async eraseTables(tables: string[] | 'ALL'): Promise<void> {
    console.log('\nErasing data tables:');

    const erase = async (table: string) => {
      const repository = this.dataSource.getRepository(table);
      console.log(`Successfully erased ${table}...`);
      await repository.query(`TRUNCATE ${table} RESTART IDENTITY CASCADE;`);
    };

    if (tables === 'ALL') {
      for (const entity of this.dataSource.entityMetadatas) {
        await erase(entity.tableName);
      }

      console.log('\nAll data erased!');
    } else {
      for (const table of tables) {
        await erase(table);
      }
      console.log('\nTables data erased!');
    }
  }

  async seed(erase: boolean): Promise<void> {
    if (erase) await this.eraseTables('ALL');

    console.log('\nSeeding database:');

    await this.callService([this.userSeederService]);

    console.log('\nDatabase seeded!');
  }

  async callService(services: Seeder[]): Promise<void> {
    for (let i = 0; i < services.length; i++) {
      const service = services[i];

      const name = service.constructor.name
        .split('Seeder')[0]
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase();

      const amount = await service.run();

      console.log(
        `Successfully seeded [${amount
          .toString()
          .padStart(3, ' ')}] ${name}...`,
      );
    }
  }

  async resetDatabase(): Promise<void> {
    console.log('\nReseting database:');

    console.log('\nDropping all tables...');
    await this.dataSource.dropDatabase();
    console.log('All tables dropped!');

    console.log('\nRunning migrations (this may take a while, please wait)...');
    execSync('npm run migration:run');
    console.log('Migration successfully ran!');

    await this.seed(false);

    console.log('\nDatabase reseted!');
  }
}

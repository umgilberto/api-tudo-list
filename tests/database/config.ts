import { dataSource } from '../../src/database';
import { execSync } from 'child_process';

const setupDatabase = async () => {
  await dataSource.initialize();
  await dataSource.runMigrations();
  execSync('npm run seed -- -d');
  console.warn('Database initialized');
};

const destroyDatabase = async () => {
  await dataSource.dropDatabase();
  await dataSource.destroy();
  execSync('docker compose down unicidades_test_db -v');
  console.warn('Database destroyed');
};

export { setupDatabase, destroyDatabase, dataSource };

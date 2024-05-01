import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { UserSeed, userSeeds } from './data';
import { UserRepository } from 'src/modules/user';
import { Seeder } from '../../seeder.base';

@Injectable()
export class UserSeederService implements Seeder {
  constructor(private readonly userRepository: UserRepository) {}

  async run(): Promise<number> {
    return Seeder.seed(userSeeds, this.userRepository);
  }

  async createUser(user: UserSeed): Promise<boolean> {
    try {
      await this.userRepository.save({
        ...user,
        password: await bcrypt.hash(user.password, 8),
      });

      return true;
    } catch (error) {
      console.error('[createUser] Something happened:', error.message);
      return false;
    }
  }
}

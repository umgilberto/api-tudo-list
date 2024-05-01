import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {
  CreateUserInput,
  UpdateUserInput,
  UserOutput,
  UserPaginationOutput,
} from './dtos';
import { UserRepository } from './repositories';
import * as utils from '../../shareds/utils';
import { GetUserOutput } from './dtos/user-pagination';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserInput): Promise<UserOutput> {
    const isEmailUsed = await this.userRepository.exist({
      where: { email: data.email },
    });

    if (isEmailUsed)
      throw new ConflictException({ key: 'email_already_exists' });

    const userCreated = await this.userRepository.save({
      ...data,
      password: await bcrypt.hash(data.password, 8),
    });

    return utils.autoMapper(
      UserOutput,
      await this.userRepository.findOne({ where: { id: userCreated.id } }),
    );
  }

  async getAll(): Promise<UserPaginationOutput> {
    const [_users, _total] = await this.userRepository.findAndCount();

    return new GetUserOutput(_users, _total);
  }

  async getOne(id: string): Promise<UserOutput> {
    const user = this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new ConflictException({ key: 'not_fround_user' });

    return utils.autoMapper(UserOutput, user);
  }

  async update(id: string, data: UpdateUserInput): Promise<UserOutput> {
    const user = this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new ConflictException({ key: 'not_fround_user' });

    await this.userRepository.update(
      { id },
      {
        ...data,
      },
    );

    return utils.autoMapper(
      UserOutput,
      await this.userRepository.findOne({ where: { id } }),
    );
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new ConflictException({ key: 'not_fround_user' });

    await this.userRepository.delete(user.id);
  }
}

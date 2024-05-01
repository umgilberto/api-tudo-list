import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthRepository } from './repositories';
import { AuthOutPut, LoginDTO } from './dtos';
import { UserRepository } from '../user';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { autoMapper } from 'src/shareds/utils';
import { environment } from 'src/configs';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login({ password, username }: LoginDTO): Promise<AuthOutPut> {
    const user = await this.userRepository.findOneBy({
      email: username,
    });

    if (!user) throw new ConflictException({ key: 'not_fround_user' });

    const match = await bcrypt.compare(user.password, password ?? '');

    if (!match) return null;

    const expiresIn = environment.jwt.expiresIn;
    const accessToken = this.jwtService.sign({
      id: user.id,
    });

    const authCreated = await this.authRepository.save({
      token: accessToken,
      user: {
        id: user.id,
      },
      expiresIn,
    });

    return autoMapper(AuthOutPut, authCreated);
  }
}

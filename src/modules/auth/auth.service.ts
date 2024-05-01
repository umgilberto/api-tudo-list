import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './repositories';
import { AuthOutPut, LoginDTO } from './dtos';
import { UserRepository } from '../user';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { autoMapper } from 'src/shareds/utils';
import { environment } from 'src/configs';
import { JwtPayload } from 'src/shareds/strategies';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login({ password, username }: LoginDTO): Promise<AuthOutPut> {
    const user = await this.userRepository.findOneBy({
      email: username,
    });
    const match = await bcrypt.compare(password, user?.password ?? '');

    if (!user || match)
      throw new UnauthorizedException({
        key: 'password or username incorrect',
      });

    const expiresIn = environment.jwt.expiresIn;

    const payload: JwtPayload = {
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(payload);

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

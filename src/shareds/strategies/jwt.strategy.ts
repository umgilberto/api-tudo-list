import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { environment } from 'src/configs';
import { AuthRepository } from 'src/modules/auth';
import { UserEntity } from 'src/modules/user';

export interface JwtPayload {
  sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => AuthRepository))
    private readonly authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.jwt.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const auth = await this.authRepository.findOne({
      where: {
        user: {
          id: payload.sub,
        },
      },
      relations: {
        user: true,
      },
    });

    if (!auth)
      throw new UnauthorizedException({
        key: 'invalid_user',
      });

    return auth.user;
  }
}

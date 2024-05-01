import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthEntity } from './entities';
import { AuthService } from './auth.service';
import { AuthRepository } from './repositories';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/configs';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    JwtModule.register({
      global: true,
      secret: environment.jwt.secret,
      signOptions: { expiresIn: environment.jwt.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [],
})
export class AuthModule {}

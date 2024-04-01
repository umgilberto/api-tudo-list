import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './user.controller';
import { AuthService } from './user.service';
import { AuthEntity } from './entities/user.entity';
import { AuthRepository, ProfileRepository } from './repositories';
import { environment } from '../../configs';
import {
  SnsService,
  S3Service,
  RouteEnum,
  LoginMiddleware,
} from '../../shareds';
import { JwtStrategy, LocalStrategy } from '../../strategies';
import { AddressModule } from '../address';
import { CardModule } from '../citizen';
import { DigitalRecordModule } from '../citizen/digital-record';
import { ContactModule } from '../contact';
import { HomologationStatusModule } from '../general-record/homologation-status';
import { RoleModule } from '../role';
import { VisitModule } from '../visit';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: environment.jwt.secret,
      signOptions: { expiresIn: environment.jwt.expiresIn },
    }),
    RoleModule,
    ContactModule,
    AddressModule,
    HomologationStatusModule,
    DigitalRecordModule,
    CardModule,
    VisitModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    ProfileRepository,
    LocalStrategy,
    JwtStrategy,
    SnsService,
    S3Service,
  ],
  exports: [AuthService, AuthRepository, ProfileRepository],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).forRoutes({
      path: `${RouteEnum.Auth}/login`,
      method: RequestMethod.POST,
    });
  }
}

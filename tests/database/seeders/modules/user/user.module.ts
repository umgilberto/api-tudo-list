import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserModule } from 'src/modules/user';
import { UserSeederService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserModule],
  providers: [UserSeederService],
  exports: [UserSeederService],
})
export class UserSeederModule {}

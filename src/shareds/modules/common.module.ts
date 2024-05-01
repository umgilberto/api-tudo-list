import { Global, Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from '../strategies';
import { AuthModule } from 'src/modules/auth';

@Global()
@Module({
  imports: [AuthModule, PassportModule],
  providers: [JwtStrategy, Logger],
  exports: [AuthModule, Logger],
})
export class CommonModule {}

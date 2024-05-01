import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { UserOutput } from 'src/modules/user';
import { BaseIdDto } from 'src/shareds/dtos';

export class AuthDTO extends BaseIdDto {
  @ApiProperty({
    description: 'User name.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @IsString()
  @Expose()
  token: string;

  @ApiProperty({
    description: 'User name.',
    example: 'user.auth',
    type: () => UserOutput,
  })
  @Expose()
  user: UserOutput;

  @ApiProperty({
    description: 'Expire token.',
    example: '8h',
  })
  @IsString()
  @Expose()
  expireIn: string;
}

export class AuthOutPut extends PartialType(
  OmitType(AuthDTO, ['user', 'id']),
) {}

export class LoginDTO {
  @ApiProperty({
    description: 'User login.',
    example: 'morgan',
  })
  @IsString()
  @Expose()
  username: string;

  @ApiProperty({
    description: 'User password.',
    example: 'Master@1234',
  })
  @IsString()
  @Expose()
  password: string;
}

export class PayloadDTO extends PartialType(
  OmitType(AuthDTO, ['id', 'expireIn']),
) {}

export class DeleteUserInput {
  @ApiProperty({
    description: 'user id.',
    example: '2b082113-9545-4582-8578-f45c63dc9ae0',
  })
  @IsString()
  id: '2b082113-9545-4582-8578-f45c63dc9ae0';
}

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { BaseIdDto } from 'src/shareds/dtos';

export class UserDTO extends BaseIdDto {
  @ApiProperty({
    description: 'User name.',
    example: 'Admin da Silva',
  })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    description: 'User cpf.',
    example: '12345678911',
  })
  @IsString()
  @Expose()
  username: string;

  @ApiProperty({
    description: 'User cpf.',
    example: 'morgan.bignews@gmail,com',
  })
  @IsString()
  @Expose()
  email: string;

  @ApiProperty({
    description: 'User cpf.',
    example: false,
  })
  @IsBoolean()
  @Expose()
  isMaster: boolean;

  @ApiProperty({
    description: 'User password.',
    example: 'Master@1234',
  })
  @IsString()
  @Expose()
  password: string;
}

export class UpdateUserInput extends PartialType(
  OmitType(UserDTO, ['password']),
) {}

export class UserOutput extends PartialType(
  OmitType(UserDTO, ['password', 'isMaster']),
) {}

export class CreateUserInput extends UserDTO {}

export class CreateUserOutPut extends OmitType(UserDTO, ['password']) {}

export class DeleteUserInput {
  @ApiProperty({
    description: 'Successfully deleted user response.',
    example: '2b082113-9545-4582-8578-f45c63dc9ae0',
  })
  @IsString()
  id: '2b082113-9545-4582-8578-f45c63dc9ae0';
}

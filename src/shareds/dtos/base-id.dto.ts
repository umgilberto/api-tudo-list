import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BaseIdDto {
  @ApiProperty({
    description: 'Id.',
    example: '2b082113-9545-4582-8578-f45c63dc9ae0',
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  id: string;
}

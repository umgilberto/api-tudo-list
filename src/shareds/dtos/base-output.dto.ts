import { ApiProperty } from '@nestjs/swagger';

export interface ListedObjects<T> {
  data: T[];
}

export class BasePaginatedOutput {
  constructor(pagination: BasePaginatedOutput) {
    Object.entries(pagination).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  @ApiProperty({
    description: 'Total itens number',
    example: 50,
  })
  total: number;
}

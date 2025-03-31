import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone16' })
  name: string;
  @ApiProperty({ example: 'good' })
  description: string;
  @ApiProperty({ example: 1500000 })
  price: number;
  @ApiProperty({ example: 'sample' })
  imageUrl: string;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

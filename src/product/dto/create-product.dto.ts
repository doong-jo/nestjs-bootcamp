export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

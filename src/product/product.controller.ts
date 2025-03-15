import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  // product get all
  @Get('/all')
  async getAllProducts(): Promise<Product[]> {
    // 제품 테이블의 정보를 가져오는 로직
    const products = await this.productService.getProducts();

    return products;
  }

  // 제품 등록
  @Post('/create')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    // @Body("name") name: string,
    // @Body("description") description: string,
    // @Body("price") price: number,
    // @Body("imageUrl") imageUrl: string,
  ): Promise<Product> {
    const product = await this.productService.createProduct(createProductDto);

    return product;
  }

  // 제품 상세 정보 불러오기
  @Get('/:id')
  async getProduct(@Param('id') id: string): Promise<Product | null> {
    const product = await this.productService.getProductById(id);

    return product;
  }

  // 제품 수정
  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    const updatedProduct = await this.productService.updateProduct(
      id,
      updateProductDto,
    );

    return updatedProduct;
  }

  // 제품 삭제
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    const deletedProduct = await this.productService.deleteProduct(id);

    return deletedProduct;
  }

  // 전체 제품 삭제
  @Delete('/all')
  async deleteAllProducts(): Promise<void> {
    const deletedProducts = await this.productService.deleteAllProducts();

    return deletedProducts;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNonNullish, isNullish } from 'remeda';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  // product table을 가져오겠다라는 의미
  @InjectRepository(Product)
  private productRepository: Repository<Product>;

  // 제품 모든 정보 가져오는 로직
  async getProducts(): Promise<Product[]> {
    const products = await this.productRepository.find();

    return products;
  }

  // 제품 등록하는 로직
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    await this.productRepository.save(newProduct);

    return newProduct;
  }

  // 제품 상세 정보 가져오는 로직
  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (isNullish(product)) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  // 제품 수정하는 로직
  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    const targetProduct = await this.productRepository.findOneBy({ id });

    if (isNullish(targetProduct)) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productRepository.update(
      {
        id,
      },
      updateProductDto,
    );

    return targetProduct;
  }

  // 제품 삭제하는 로직
  async deleteProduct(id: string): Promise<void> {
    const deleteResult = await this.productRepository.delete({ id });

    const isDeletedProduct = isNonNullish(deleteResult.affected);

    if (!isDeletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return;
  }

  // 전체 제품 삭제하는 로직
  async deleteAllProducts(): Promise<void> {
    await this.productRepository.clear();

    return;
  }
}

import { BaseEntity } from 'src/common/base.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @Column()
  content: string;

  @ManyToOne(() => Product, (product) => product.comments)
  public product: Product;
}

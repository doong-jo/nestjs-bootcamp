import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public price: number;

  @Column()
  public imageUrl: string;

  @OneToMany(() => Comment, (comment) => comment.product, {
    // Product를 조회할 때 Comment도 함께 조회되어야 합니다.
    eager: true,
    // Product를 삭제하면 해당 Product에 대한 모든 Comment도 삭제되어야 합니다.
    cascade: true,
  })
  public comments: Comment[];
}

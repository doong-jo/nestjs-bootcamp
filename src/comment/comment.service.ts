import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly productService: ProductService,
  ) {}

  /**
   * Create a comment
   *
   * @param productId - Product ID
   * @param content - Comment content
   * @returns Created comment
   */
  async createComment(
    productId: string,
    { content }: CreateCommentDto,
  ): Promise<Comment> {
    const product = await this.productService.getProductById(productId);

    const newComment = this.commentRepository.create({
      content,
      product,
    });
    await this.commentRepository.save(newComment);

    return newComment;
  }

  /**
   * Get all comments
   *
   * @returns All comments
   */
  async getAllComments(): Promise<Comment[]> {
    const comments = await this.commentRepository.find();

    return comments;
  }
}

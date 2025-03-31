import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/all')
  async getAllProducts(): Promise<Comment[]> {
    const comments = await this.commentService.getAllComments();

    return comments;
  }

  @Post('/:productId')
  async create(
    @Param('productId') productId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const newComment = await this.commentService.createComment(
      productId,
      createCommentDto,
    );

    return newComment;
  }
}

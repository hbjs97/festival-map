import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, JwtPayload } from 'src/auth';
import { Public, ReqUser } from 'src/common';
import { Post as PostEntity } from 'src/entity/post.entity';
import { PostCreateDto } from './dto/post.create.dto';
import { PostGetDto } from './dto/post.get.dto';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Public()
  @Get()
  public async getPosts(
    @Query() postGetDto: PostGetDto,
  ): Promise<[PostEntity[], number]> {
    return await this.postService.getPosts(postGetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':postId')
  public async getPostById(
    @Param('postId') postId: number,
  ): Promise<PostEntity> {
    await this.postService.increaseViewCountById(postId);
    return await this.postService.getPostById(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createPost(
    @Body() postCreateDto: PostCreateDto,
    @ReqUser() user: JwtPayload,
  ): Promise<PostEntity> {
    postCreateDto.createdBy = user.userId;
    return await this.postService.createPost(postCreateDto);
  }
}

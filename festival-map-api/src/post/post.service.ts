import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entity/post.entity';
import { Repository } from 'typeorm';
import { PostGetDto } from './dto/post.get.dto';
import { PostCreateDto } from './dto/post.create.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostService {
  constructor(
    private config: ConfigService,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  public async getPosts(postGetDto: PostGetDto): Promise<[Post[], number]> {
    return this.postRepository.findAndCount({
      relations: ['createdBy'],
      order: {
        postId: 'DESC',
      },
      skip: postGetDto.page * this.config.get('perPage'),
      take: this.config.get('perPage'),
    });
  }

  public async getPostById(postId: number): Promise<Post> {
    return this.postRepository.findOneOrFail({
      where: {
        postId,
      },
      relations: ['createdBy', 'replies'],
    });
  }

  public async createPost(postCreateDto: PostCreateDto): Promise<Post> {
    try {
      return this.postRepository.save(
        this.postRepository.create(postCreateDto),
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

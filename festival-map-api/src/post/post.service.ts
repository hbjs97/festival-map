import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entity/post.entity';
import { Repository } from 'typeorm';
import { PostGetDto } from './dto/post.get.dto';
import { PostCreateDto } from './dto/post.create.dto';
import { ConfigService } from '@nestjs/config';
import { Reply } from 'src/entity/reply.entity';

@Injectable()
export class PostService {
  constructor(
    private config: ConfigService,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  public async getPosts(postGetDto: PostGetDto): Promise<[Post[], number]> {
    const rawPosts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.createdBy', 'createdBy')
      .addSelect(
        (qb) =>
          qb
            .select('COUNT(reply.replyId)', 'repliesCount')
            .from(Reply, 'reply')
            .where('reply.post = post.postId'),
        'repliesCount',
      )
      .groupBy('post.postId')
      .orderBy('post.postId', 'DESC')
      .offset(postGetDto.page * this.config.get('perPage'))
      .limit(this.config.get('perPage'))
      .getRawMany();
    const postsCount = await this.postRepository.count();
    return [rawPosts, postsCount];
  }

  public async getPostById(postId: number): Promise<Post> {
    return this.postRepository.findOneOrFail({
      where: {
        postId,
      },
      relations: ['createdBy'],
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

  public async increaseViewCountById(postId: number): Promise<void> {
    try {
      await this.postRepository.increment({ postId }, 'viewCount', 1);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

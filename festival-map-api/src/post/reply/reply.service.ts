import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Reply } from 'src/entity/reply.entity';
import { Repository } from 'typeorm';
import { ReplyCreateDto } from './dto/reply.create.dto';
import { ReplyGetDto } from './dto/reply.get.dto';

@Injectable()
export class ReplyService {
  constructor(
    private config: ConfigService,

    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,
  ) {}

  public async getReplies(
    postId: number,
    replyGetDto: ReplyGetDto,
  ): Promise<Reply[]> {
    return this.replyRepository.find({
      where: {
        post: {
          postId,
        },
      },
      relations: ['createdBy'],
      order: {
        replyId: 'DESC',
      },
      skip: replyGetDto.page * this.config.get('perPage'),
      take: this.config.get('perPage'),
    });
  }

  public async createReply(
    postId: number,
    replyCreateDto: ReplyCreateDto,
  ): Promise<Reply> {
    try {
      return this.replyRepository.save(
        this.replyRepository.create({
          ...replyCreateDto,
          post: {
            postId,
          },
        }),
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

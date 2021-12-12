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
import { ReqUser } from 'src/common';
import { Reply } from 'src/entity/reply.entity';
import { ReplyCreateDto } from './dto/reply.create.dto';
import { ReplyGetDto } from './dto/reply.get.dto';
import { ReplyService } from './reply.service';

@Controller()
export class ReplyController {
  constructor(private replyService: ReplyService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getReplies(
    @Param('postId') postId: number,
    @Query() replyGetDto: ReplyGetDto,
  ): Promise<Reply[]> {
    return await this.replyService.getReplies(postId, replyGetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createPost(
    @Param('postId') postId: number,
    @Body() replyCreateDto: ReplyCreateDto,
    @ReqUser() user: JwtPayload,
  ): Promise<Reply> {
    replyCreateDto.createdBy = user.userId;
    return await this.replyService.createReply(postId, replyCreateDto);
  }
}

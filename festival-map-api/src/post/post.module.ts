import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ReplyModule } from './reply/reply.module';

@Module({
  imports: [ReplyModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

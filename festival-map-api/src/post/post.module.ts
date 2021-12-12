import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entity/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ReplyModule } from './reply/reply.module';

@Module({
  imports: [ReplyModule, TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}

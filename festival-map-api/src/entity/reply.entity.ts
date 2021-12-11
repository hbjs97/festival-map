import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity('reply')
export class Reply {
  @PrimaryGeneratedColumn({ name: 'reply_id' })
  replyId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'userId' })
  createdBy: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column({ name: 'content', length: 500 })
  content: string;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'postId' })
  post: Post;
}

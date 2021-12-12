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
import { Reply } from './reply.entity';
import { User } from './user.entity';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn({ name: 'post_id' })
  postId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'userId' })
  createdBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column({ name: 'title', length: 255 })
  title: string;

  @Column({ name: 'content', length: 500 })
  content: string;

  @OneToMany((type) => Reply, (reply) => reply.post)
  replies: Reply[];
}

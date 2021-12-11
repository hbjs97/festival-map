import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column('varchar', {
    name: 'password',
    comment: '비밀번호',
    length: 255,
    select: false,
  })
  password: string;

  @Column('varchar', {
    name: 'user_name',
    comment: '로그인 시 입력하는 이름',
    length: 30,
    unique: true,
  })
  username: string;

  @Column('varchar', {
    name: 'display_name',
    comment: '닉네임',
    length: 30,
    unique: true,
  })
  displayname: string;

  @Column('datetime', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('datetime', {
    name: 'deleted_at',
    nullable: true,
    comment: 'soft delete',
  })
  deletedAt: Date | null;

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword?(): Promise<void> {
    if (this.password)
      this.password = await bcrypt.hash(this.password, +process.env.ROUND_SALT);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { UserSignupDto } from './dto/user.signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createUser(userSignupDto: UserSignupDto): Promise<User> {
    return await this.userRepository.save(
      this.userRepository.create(userSignupDto),
    );
  }

  public async findUserByUserName(
    username: string,
    withPassword = false,
  ): Promise<User> {
    const selectProps: (keyof User)[] = [
      'userId',
      'password',
      'username',
      'displayname',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];
    withPassword == true && selectProps.push('password');
    return await this.userRepository.findOneOrFail({
      where: {
        username: username,
      },
      select: selectProps,
    });
  }
}

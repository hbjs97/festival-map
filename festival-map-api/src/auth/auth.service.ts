import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { UserService } from '../shared/user';
import { JwtPayload, Payload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private userService: UserService) {}

  public async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findUserByUserName(username, true);

    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('password mismatched', HttpStatus.UNAUTHORIZED);
    }

    return await this.userService.findUserByUserName(username);
  }

  public signJwt(user: Payload): { access_token: string } {
    const payload: JwtPayload = {
      sub: user.userId,
      userId: user.userId,
      username: user.username,
      // roles: user.roles,
    };

    return {
      access_token: this.jwt.sign(payload),
    };
  }
}

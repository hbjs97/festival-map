import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import type { Request } from 'express';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/shared/user';
import { UserSignupDto } from 'src/shared/user/dto/user.signup.dto';
import { AuthService, Payload, LocalAuthGuard } from '../../auth';
import { Public } from '../../common';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post('signup')
  public signup(
    @Body() userSignupDto: UserSignupDto,
    @Req() req,
  ): Promise<User> {
    console.log(req.body);
    return this.userService.createUser(userSignupDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public jwtLogin(@Req() req: Request): { access_token: string } {
    return this.authService.signJwt(<Payload>req.user);
  }
}

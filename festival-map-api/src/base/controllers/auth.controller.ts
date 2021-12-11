import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Res,
  Body,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/shared/user';
import { UserSignupDto } from 'src/shared/user/dto/user.signup.dto';
import { AuthService, Payload, LocalAuthGuard, JwtAuthGuard } from '../../auth';
import { Public, ReqUser } from '../../common';

/**
 * https://docs.nestjs.com/techniques/authentication
 */
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

  @UseGuards(JwtAuthGuard)
  @Get('check')
  public jwtCheck(@ReqUser() user: Payload): Payload {
    return user;
  }
}

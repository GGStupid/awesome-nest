import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() resterData: CreateUserDto) {
    console.log('register');
    return this.authService.register(resterData);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    return response.send(user);
  }
}

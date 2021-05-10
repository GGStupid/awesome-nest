import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { request, response, Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import JwtAuthenticationGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() resterData: CreateUserDto) {
    return this.authService.register(resterData);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(+user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @Get('info')
  @UseGuards(JwtAuthenticationGuard)
  async userInfo(@Req() request: RequestWithUser) {
    const { user } = request;
    return user;
  }

  @Post('logout')
  @UseGuards(JwtAuthenticationGuard)
  async logout(@Req() request: RequestWithUser) {
    const cookie = this.authService.getCookieForLogOut();
    request.res.setHeader('Set-Cookie', cookie);
    return null;
  }
}

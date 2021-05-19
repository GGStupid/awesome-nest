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
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import JwtAuthGuard from './guards/jwt-auth.guard';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() resterData: CreateUserDto) {
    return this.authService.register(resterData);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtToken(user.id);
    const {
      cookie: refreshTokenCookie,
      token: refreshToken,
    } = this.authService.getCookieWithJwtRefreshToken(user.id);
    await this.userService.setCurrentRefreshToken(refreshToken, user.id);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;
  }

  @Get('/refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtToken(
      request.user.id,
    );
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  async userInfo(@Req() request: RequestWithUser) {
    const { user } = request;
    return user;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() request: RequestWithUser) {
    const cookie = this.authService.getCookieForLogOut();
    this.userService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return null;
  }
}

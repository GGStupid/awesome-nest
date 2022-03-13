import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { compare, hash } from 'bcrypt';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerUser: CreateUserDto) {
    const hashedPassword = await hash(registerUser.password, 10);
    try {
      const createUser = await this.userService.register({
        ...registerUser,
        password: hashedPassword,
      });
      return createUser;
    } catch (error) {
      if (error.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          '用户名已注册或邮箱已占用',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException('出错了', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getCookieWithJwtToken(userId: number) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_TOKEN_EXPIRATION_SECRET')}s`,
    });
    return `Authentication=${token};HttpOnly;Path=/;Max-Age=${this.configService.get(
      'JWT_TOKEN_EXPIRATION_SECRET',
    )}`;
  }

  getCookieWithJwtRefreshToken(userId: number) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const cookie = `Refresh=${token};HttpOnly;Path=/;Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie,
      token,
    };
  }

  getCookieForLogOut() {
    return [
      `Authentication=; HttpOnly; Path=/; Max-Age=0`,
      `Refresh=; HttpOnly; Path=/; Max-Age=0`,
    ];
  }

  async getAuthenticateUser(username: string, password: string) {
    const user = await this.userService.findOneByUserName(username);
    if (!user) {
      throw new HttpException('用户未注册或用户名错误', HttpStatus.BAD_REQUEST);
    }
    await this.verifyPassword(password, user.password);
    return user;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException('账号或密码错误', HttpStatus.BAD_REQUEST);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthService) {
    super({
      usernameField: 'userName',
    });
  }

  async validate(userName: string, passport: string): Promise<User> {
    return this.authenticationService.getAuthenticateUser(userName, passport);
  }
}

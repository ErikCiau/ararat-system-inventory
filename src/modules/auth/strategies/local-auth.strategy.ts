import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      session: false,
      passReqToCallback: false,
    });
  }

  async validate(username: string, password: string) {
    return await this.authService.validateUser(username, password);
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'sua-chave-secreta',
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.email, null);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

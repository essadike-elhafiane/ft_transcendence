import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'essadike',
    });
  }

  async validate(payload: any) {
    // Perform any additional validation or database lookup based on the extracted payload
    return { userId: payload.id, email: payload.email };
  }
}
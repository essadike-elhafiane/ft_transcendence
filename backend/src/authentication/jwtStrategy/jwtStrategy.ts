import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => { 
          let token = null;
          console.log(request.cookies);
          if (request && request.cookies) {
            token = request.cookies.jwt;
          }
          return token;
        },
      ]),
      secretOrKey: 'essadike',
    });
  }

  async validate(payload: any) {
    // Perform any additional validation or database lookup based on the extracted payload
    return { userId: payload.id, email: payload.email,  };
  }
}
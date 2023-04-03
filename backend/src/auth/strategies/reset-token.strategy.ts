import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  IPayload,
  IValidateStrategyResponse,
} from '../interface/payload.interface';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../constants';

@Injectable()
export class ResetTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-reset'
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.resetTokenSecret,
    });
  }

  async validate(payload: IPayload): Promise<IValidateStrategyResponse> {
    const resetToken = await this.authService.validateResetToken(payload);
    if (!resetToken) {
      throw new UnauthorizedException();
    }
    return { _id: payload.sub, email: payload.email };
  }
}

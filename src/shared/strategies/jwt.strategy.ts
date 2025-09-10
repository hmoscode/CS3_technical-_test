import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";

import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from "passport-jwt";
import { LoginPayload } from "../../auth/dtos/token-payload.dto";
import { ValidateSessionService } from "../../auth/services/validate-session.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly validateSessionService: ValidateSessionService
  ) {
    const options: StrategyOptionsWithRequest = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get<string>("jwt.secret") ??
        (() => {
          throw new Error("JWT secret is not defined");
        })(),
      passReqToCallback: true,
    };
    super(options);
  }

  async validate(
    req: Request,
    payload: LoginPayload
  ): Promise<{ id: number; email: string }> {
    const user = await this.validateSessionService.run(payload.sub);

    if (!user) {
      throw new UnauthorizedException(
        "Usuario no autorizado o sesión inválida"
      );
    }

    return user;
  }
}

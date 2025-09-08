import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { LoginResponse } from "../dtos/login-response-dto";
import { LoginPayload } from "../dtos/token-payload.dto";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  run(payload: LoginPayload): LoginResponse {
    const secret = this.configService.get<string>("jwt.secret");
    const jwtRefreshExpiresIn = this.configService.get<string>("jwt.expiresIn");
    const accessToken = this.jwtService.sign(payload, { secret });
    const refreshToken = this.jwtService.sign(payload, {
      secret,
      expiresIn: jwtRefreshExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { DEFAULT_STRATEGY } from "../shared/constants/auth.constant";
import { JwtStrategy } from "../shared/strategies/jwt.strategy";
import { UserRepository } from "../users/repositories/user.repository";
import { AuthController } from "./controllers/auth.controller";
import { LoginService } from "./services/login.service";
import { TokenService } from "./services/token.service";
import { ValidateSessionService } from "./services/validate-session.service";

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: DEFAULT_STRATEGY,
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginService,
    TokenService,
    ValidateSessionService,
    UserRepository,
    JwtService,
    JwtStrategy,
  ],
})
export class AuthModule {}

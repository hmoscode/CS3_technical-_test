import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "../users/repositories/user.repository";
import { AuthController } from "./controllers/auth.controller";
import { LoginService } from "./services/login.service";
import { TokenService } from "./services/token.service";
import { ValidateSessionService } from "./services/validate-session.service";

@Module({
  controllers: [AuthController],
  providers: [
    LoginService,
    TokenService,
    ValidateSessionService,
    UserRepository,
    JwtService,
  ],
})
export class AuthModule {}

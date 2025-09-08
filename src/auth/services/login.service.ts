import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { comparePasswords } from "../../shared/utils/password.util";
import { UserRepository } from "../../users/repositories/user.repository";
import { LoginDto } from "../dtos/login.dto";
import { LoginPayload } from "../dtos/token-payload.dto";
import { TokenService } from "./token.service";

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService
  ) {}

  async run(payload: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: payload.email },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const isValid = await comparePasswords(payload.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    const tokenPayload: LoginPayload = {
      email: user.email,
      sub: user.id,
    };

    return this.tokenService.run(tokenPayload);
  }
}

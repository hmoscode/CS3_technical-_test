import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "../dtos/login.dto";
import { LoginResponse } from "../dtos/login-response-dto";
import { LoginService } from "../services/login.service";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @Post("login")
  @ApiOperation({
    summary: "Login",
    description: "Login user and return access token",
  })
  @ApiOkResponse({
    type: LoginResponse,
  })
  async login(@Body() data: LoginDto): Promise<LoginResponse> {
    return await this.loginService.run(data);
  }
}

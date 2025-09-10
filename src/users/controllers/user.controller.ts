import { Body, Controller, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { CREATED_MESSAGE } from "../../shared/constants/messages.constant";
import { CreatedRecordResponseDto } from "../../shared/dtos/response.dto";
import { UserDto } from "../dtos/user.dto";
import { CreateUserService } from "../services/create-user.service";

@Controller("user")
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @ApiOkResponse({
    type: CreatedRecordResponseDto,
  })
  @ApiOperation({
    summary: "Create User",
    description:
      "Creates a new user in the system if the email is not registered.",
  })
  async create(@Body() data: UserDto): Promise<CreatedRecordResponseDto> {
    const id = await this.createUserService.run(data);
    return {
      statusCode: HttpStatus.CREATED,
      data: { rowId: id },
      message: CREATED_MESSAGE,
    };
  }
}

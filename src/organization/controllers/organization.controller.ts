import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  CREATED_MESSAGE,
  UPDATED_MESSAGE,
} from "../../shared/constants/messages.constant";
import {
  CreatedRecordResponseDto,
  UpdateRecordResponseDto,
} from "../../shared/dtos/response.dto";
import { CreateOrganizationDto } from "../dtos/organization.dto";
import { OrganizationEntity } from "../entities/organization.entity";
import { CreateOrganizationService } from "../services/create-organization.service";
import { GetOrganizationService } from "../services/get-organization.service";
import { UpdateOrganizationService } from "../services/update-organization.service";

@Controller("organization")
@ApiTags("Organization")
export class OrganizationController {
  constructor(
    private readonly getOrganizationService: GetOrganizationService,
    private readonly updateOrganizationService: UpdateOrganizationService,
    private readonly createOrganizationService: CreateOrganizationService
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create organization",
    description: "Create a new organization",
  })
  @ApiOkResponse({
    type: CreatedRecordResponseDto,
  })
  async create(
    @Body() data: CreateOrganizationDto
  ): Promise<CreatedRecordResponseDto> {
    const id = await this.createOrganizationService.run(data);

    return {
      message: CREATED_MESSAGE,
      statusCode: HttpStatus.CREATED,
      data: { rowId: id },
    };
  }

  @Get()
  @ApiOperation({
    summary: "Get organization",
    description: "Get an organization by ID",
  })
  @ApiOkResponse({
    type: CreateOrganizationDto,
  })
  async get(): Promise<OrganizationEntity> {
    return await this.getOrganizationService.run();
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update organization",
    description: "Update an existing organization",
  })
  async update(
    @Param("id") id: number,
    @Body() data: CreateOrganizationDto
  ): Promise<UpdateRecordResponseDto> {
    await this.updateOrganizationService.run(id, data);
    return {
      message: UPDATED_MESSAGE,
      statusCode: HttpStatus.OK,
    };
  }
}

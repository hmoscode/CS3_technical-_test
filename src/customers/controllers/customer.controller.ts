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
import { CREATED_MESSAGE } from "../../shared/constants/messages.constant";
import { CreatedRecordResponseDto } from "../../shared/dtos/response.dto";
import { CustomerDto } from "../dtos/customer.dto";
import { CreateCustumerService } from "../services/create-custumer.service";
import { GetAllCustomersService } from "../services/get-all-customer.service";
import { GetCustomerByIdService } from "../services/get-customers-by-id.service";
import { UpdateCustomerService } from "../services/update-customer.service";

@Controller("customer")
@ApiTags("Customers")
export class CustomerController {
  constructor(
    private readonly getAllCustomersService: GetAllCustomersService,
    private readonly createCustomerService: CreateCustumerService,
    private readonly updateCustomerService: UpdateCustomerService,
    private readonly getCustomerByIdService: GetCustomerByIdService
  ) {}

  @Post()
  @ApiOkResponse({
    type: CreatedRecordResponseDto,
  })
  @ApiOperation({
    summary: "Create a new customer",
    description: "Create a new customer",
  })
  async create(@Body() data: CustomerDto): Promise<CreatedRecordResponseDto> {
    const id = await this.createCustomerService.run(data);

    return {
      message: CREATED_MESSAGE,
      data: {
        rowId: id,
      },
      statusCode: HttpStatus.OK,
    };
  }

  @Get()
  @ApiOkResponse({
    type: CustomerDto,
    isArray: true,
  })
  @ApiOperation({
    summary: " Get all customers",
    description: " Get all customers",
  })
  async getAll() {
    return await this.getAllCustomersService.run();
  }

  @Get(":id")
  @ApiOkResponse({
    type: CreatedRecordResponseDto,
  })
  @ApiOperation({
    summary: "Get customer by ID",
    description: "Get customer by ID",
  })
  async getById(@Param("id") id: number) {
    return await this.getCustomerByIdService.run(id);
  }

  @Put(":id")
  @ApiOkResponse({
    type: CreatedRecordResponseDto,
  })
  @ApiOperation({
    summary: "Update customer",
    description: "Update customer",
  })
  async update(@Param("id") id: number, @Body() data: CustomerDto) {
    await this.updateCustomerService.run(id, data);
    return {
      message: "Customer updated successfully",
      statusCode: HttpStatus.OK,
    };
  }
}

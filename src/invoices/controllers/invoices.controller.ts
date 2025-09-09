import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { CREATED_MESSAGE } from "../../shared/constants/messages.constant";
import { CreatedRecordResponseDto } from "../../shared/dtos/response.dto";
import { InvoiceDto } from "../dtos/invoice.dto";
import { CreateInvoiceService } from "../services/create-invoice.service";
import { GetInvoiceByIdService } from "../services/get-invoice-by-id.service";

@Controller("invoices")
export class InvoicesController {
  constructor(
    private readonly createInvoiceService: CreateInvoiceService,
    private readonly getInvoiceByIdService: GetInvoiceByIdService
  ) {}

  @Post()
  @ApiOkResponse({
    type: CreatedRecordResponseDto,
  })
  @ApiOperation({
    summary: "Create a new invoice",
    description: "Creates a new invoice with the provided details",
  })
  async create(@Body() data: InvoiceDto): Promise<CreatedRecordResponseDto> {
    const id = await this.createInvoiceService.run(data);
    return {
      statusCode: HttpStatus.CREATED,
      message: CREATED_MESSAGE,
      data: {
        rowId: id,
      },
    };
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return await this.getInvoiceByIdService.run(id);
  }
}

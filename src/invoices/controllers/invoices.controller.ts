import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { Response } from "express";
import { CREATED_MESSAGE } from "../../shared/constants/messages.constant";
import { CreatedRecordResponseDto } from "../../shared/dtos/response.dto";
import { InvoiceDto } from "../dtos/invoice.dto";
import { CreateInvoiceService } from "../services/create-invoice.service";
import { GenerateReportInvoiceService } from "../services/generate-report-invoice.service";
import { GetInvoiceByIdService } from "../services/get-invoice-by-id.service";
import { TopInvoicesService } from "../services/top-invoices.service";
@Controller("invoices")
export class InvoicesController {
  constructor(
    private readonly createInvoiceService: CreateInvoiceService,
    private readonly getInvoiceByIdService: GetInvoiceByIdService,
    private readonly generateReportInvoiceService: GenerateReportInvoiceService,
    private readonly topInvoicesService: TopInvoicesService
  ) {}

  @Post()
  @ApiOkResponse({
    type: CreatedRecordResponseDto,
  })
  @ApiOperation({
    summary: "Create a new invoice",
    description: "Creates a new invoice with the provided details",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
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

  @Get("top-by-items")
  @ApiOperation({
    summary: "Get top 5 invoices by number of items",
    description: "Retrieve the top 5 invoices with the highest number of items",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getTopByItems() {
    return await this.topInvoicesService.getTop5ByItems();
  }

  @Get("top-by-amount")
  @ApiOperation({
    summary: "Get top 5 invoices by total amount",
    description: "Retrieve the top 5 invoices with the highest total amount",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getTopByAmount() {
    return await this.topInvoicesService.getTop5ByTotalAmount();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get invoice by ID",
    description: "Retrieve a single invoice by its ID",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async findOne(@Param("id") id: number) {
    return await this.getInvoiceByIdService.run(id);
  }

  @Get(":id/report")
  @ApiOperation({
    summary: "Download invoice PDF report",
    description: "Generate and download a PDF report for the specified invoice",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async downloadInvoicePdf(@Param("id") id: number, @Res() res: Response) {
    const buffer = await this.generateReportInvoiceService.run(id);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${id}.pdf`,
      "Content-Length": buffer.length,
    });

    return res.status(HttpStatus.OK).send(buffer);
  }
}

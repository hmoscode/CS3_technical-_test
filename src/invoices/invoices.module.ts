import { Module } from "@nestjs/common";
import { ArticleRepository } from "../articles/repositories/article.repository";
import { InvoicesController } from "./controllers/invoices.controller";
import { InvoiceRepository } from "./repositories/invoice.repository";
import { InvoiceDetailRepository } from "./repositories/invoice-detail.repository";
import { CreateInvoiceService } from "./services/create-invoice.service";
import { GetInvoiceByIdService } from "./services/get-invoice-by-id.service";
import { InvoiceDetailCalculatorService } from "./services/invoice-detail-calculator.service";

@Module({
  providers: [
    CreateInvoiceService,
    InvoiceDetailCalculatorService,
    GetInvoiceByIdService,
    InvoiceRepository,
    InvoiceDetailRepository,
    ArticleRepository,
  ],
  controllers: [InvoicesController],
})
export class InvoicesModule {}

import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ArticleRepository } from "../articles/repositories/article.repository";
import { OrganizationRepository } from "../organization/repositories/organization.repository";
import { DEFAULT_STRATEGY } from "../shared/constants/auth.constant";
import { InvoicesController } from "./controllers/invoices.controller";
import { InvoiceRepository } from "./repositories/invoice.repository";
import { InvoiceDetailRepository } from "./repositories/invoice-detail.repository";
import { CreateInvoiceService } from "./services/create-invoice.service";
import { GenerateReportInvoiceService } from "./services/generate-report-invoice.service";
import { GetInvoiceByIdService } from "./services/get-invoice-by-id.service";
import { InvoiceDetailCalculatorService } from "./services/invoice-detail-calculator.service";
import { TopInvoicesService } from "./services/top-invoices.service";

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: DEFAULT_STRATEGY,
    }),
  ],
  providers: [
    CreateInvoiceService,
    InvoiceDetailCalculatorService,
    GetInvoiceByIdService,
    InvoiceRepository,
    InvoiceDetailRepository,
    ArticleRepository,
    GenerateReportInvoiceService,
    OrganizationRepository,
    TopInvoicesService,
  ],
  controllers: [InvoicesController],
})
export class InvoicesModule {}

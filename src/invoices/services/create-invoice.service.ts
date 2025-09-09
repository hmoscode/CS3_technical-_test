import { ConflictException, Injectable } from "@nestjs/common";
import { InvoiceDto } from "../dtos/invoice.dto";
import { InvoiceDetailEntity } from "../entities/invoice-detail.entity";
import { InvoiceRepository } from "../repositories/invoice.repository";
import { InvoiceDetailRepository } from "../repositories/invoice-detail.repository";
import { InvoiceDetailCalculatorService } from "./invoice-detail-calculator.service";

@Injectable()
export class CreateInvoiceService {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly invoiceDetailCalculatorService: InvoiceDetailCalculatorService,
    private readonly invoiceDetailRepository: InvoiceDetailRepository
  ) {}

  async run(data: InvoiceDto): Promise<number> {
    const { details, totalAmount } =
      await this.invoiceDetailCalculatorService.buildInvoiceDetails(
        data.details
      );

    const existingInvoice = await this.invoiceRepository.findOne({
      where: { invoiceNumber: data.invoiceNumber },
    });
    if (existingInvoice) {
      throw new ConflictException("Invoice with this number already exists");
    }

    const invoice = this.invoiceRepository.create({
      invoiceNumber: data.invoiceNumber,
      customerId: data.customerId,
      totalAmount,
    });
    const savedInvoice = await this.invoiceRepository.save(invoice);

    const invoiceDetails: InvoiceDetailEntity[] = details.map((detail) => ({
      invoiceId: savedInvoice.id,
      articleId: detail.articleId,
      quantity: detail.quantity,
      unitPrice: detail.unitPrice,
      totalPrice: detail.totalPrice,
      priceWithWholesale: detail.priceWithWholesale ?? undefined,
    }));
    await this.invoiceDetailRepository.save(invoiceDetails);
    return savedInvoice.id;
  }
}

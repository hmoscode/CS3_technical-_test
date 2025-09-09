import { Injectable, NotFoundException } from "@nestjs/common";
import { InvoiceRepository } from "../repositories/invoice.repository";

@Injectable()
export class GetInvoiceByIdService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async run(id: number) {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ["customer", "details"],
    });

    if (!invoice) {
      throw new NotFoundException("Invoice not found");
    }
    return invoice;
  }
}

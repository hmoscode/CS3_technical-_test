import { Injectable, NotFoundException } from "@nestjs/common";
import { InvoiceRepository } from "../repositories/invoice.repository";

@Injectable()
export class GetInvoiceByIdService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async run(id: number) {
    const invoice = await this.invoiceRepository
      .createQueryBuilder("invoice")
      .leftJoinAndSelect("invoice.customer", "customer")
      .leftJoinAndSelect("invoice.details", "details")
      .leftJoinAndSelect("details.article", "article")
      .where("invoice.id = :id", { id })
      .select([
        "invoice",
        "customer",
        "details",
        "article.id",
        "article.name",
        "article.price",
        "article.code",
      ])
      .getOne();

    if (!invoice) {
      throw new NotFoundException("Invoice not found");
    }
    return invoice;
  }
}

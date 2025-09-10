import { Injectable } from "@nestjs/common";

import { InvoiceEntity } from "../entities/invoice.entity";
import { InvoiceRepository } from "../repositories/invoice.repository";

@Injectable()
export class TopInvoicesService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async getTop5ByItems(): Promise<InvoiceEntity[]> {
    return await this.invoiceRepository
      .createQueryBuilder("invoice")
      .select(["invoice.id", "invoice.totalAmount"])
      .addSelect("COUNT(detail.id)", "itemsCount")
      .leftJoin("invoice.details", "detail")
      .groupBy("invoice.id")
      .orderBy("itemsCount", "DESC")
      .limit(5)
      .getRawMany();
  }

  async getTop5ByTotalAmount(): Promise<InvoiceEntity[]> {
    return await this.invoiceRepository
      .createQueryBuilder("invoice")
      .orderBy("invoice.totalAmount", "DESC")
      .limit(5)
      .getMany();
  }
}

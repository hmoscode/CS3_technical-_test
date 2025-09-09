import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InvoiceEntity } from "../entities/invoice.entity";
@Injectable()
export class InvoiceRepository extends Repository<InvoiceEntity> {
  constructor(dataSource: DataSource) {
    super(InvoiceEntity, dataSource.createEntityManager());
  }
}

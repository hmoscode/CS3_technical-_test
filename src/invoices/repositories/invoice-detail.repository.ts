import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InvoiceDetailEntity } from "../entities/invoice-detail.entity";
@Injectable()
export class InvoiceDetailRepository extends Repository<InvoiceDetailEntity> {
  constructor(dataSource: DataSource) {
    super(InvoiceDetailEntity, dataSource.createEntityManager());
  }
}

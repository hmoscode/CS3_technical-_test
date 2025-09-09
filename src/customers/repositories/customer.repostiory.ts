import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CustomerEntity } from "../entities/customer.entity";

@Injectable()
export class CustomerRepository extends Repository<CustomerEntity> {
  constructor(dataSource: DataSource) {
    super(CustomerEntity, dataSource.createEntityManager());
  }
}

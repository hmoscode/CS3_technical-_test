import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { OrganizationEntity } from "../entities/organization.entity";

@Injectable()
export class OrganizationRepository extends Repository<OrganizationEntity> {
  constructor(dataSource: DataSource) {
    super(OrganizationEntity, dataSource.createEntityManager());
  }
}

import { Injectable } from "@nestjs/common";
import { OrganizationEntity } from "../entities/organization.entity";
import { OrganizationRepository } from "../repositories/organization.repository";

@Injectable()
export class GetOrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository
  ) {}

  async run(): Promise<OrganizationEntity> {
    const organization = await this.organizationRepository.findOne({
      where: {
        id: 1,
      },
    }); // considere dejarlo de esta forma ya que es single tenant, si fuera multi tenant se deberia buscar por id
    if (!organization) {
      throw new Error("Organization not found");
    }
    return organization;
  }
}

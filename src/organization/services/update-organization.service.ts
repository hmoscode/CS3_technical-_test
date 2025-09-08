import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrganizationDto } from "../dtos/organization.dto";
import { OrganizationRepository } from "../repositories/organization.repository";

@Injectable()
export class UpdateOrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository
  ) {}

  async run(id: number, data: CreateOrganizationDto): Promise<void> {
    const existing = await this.organizationRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException("Organization not found");
    }
    await this.organizationRepository.update(id, data);
  }
}

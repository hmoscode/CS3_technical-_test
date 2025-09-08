import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrganizationDto } from "../dtos/organization.dto";
import { OrganizationRepository } from "../repositories/organization.repository";

@Injectable()
export class CreateOrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository
  ) {}

  async run(data: CreateOrganizationDto): Promise<number> {
    const existing = await this.organizationRepository.findOne({
      where: { id: 1 },
    });
    if (existing) {
      throw new BadRequestException("An organization already exists.");
    }
    const organization = this.organizationRepository.create(data);
    const savedOrganization =
      await this.organizationRepository.save(organization);
    return savedOrganization.id;
  }
}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganizationController } from "./controllers/organization.controller";
import { OrganizationEntity } from "./entities/organization.entity";
import { OrganizationRepository } from "./repositories/organization.repository";
import { CreateOrganizationService } from "./services/create-organization.service";
import { GetOrganizationService } from "./services/get-organization.service";
import { UpdateOrganizationService } from "./services/update-organization.service";

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  providers: [
    CreateOrganizationService,
    GetOrganizationService,
    UpdateOrganizationService,
    OrganizationRepository,
  ],
  controllers: [OrganizationController],
})
export class OrganizationModule {}

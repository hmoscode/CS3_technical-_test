import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DEFAULT_STRATEGY } from "../shared/constants/auth.constant";
import { OrganizationController } from "./controllers/organization.controller";
import { OrganizationEntity } from "./entities/organization.entity";
import { OrganizationRepository } from "./repositories/organization.repository";
import { CreateOrganizationService } from "./services/create-organization.service";
import { GetOrganizationService } from "./services/get-organization.service";
import { UpdateOrganizationService } from "./services/update-organization.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationEntity]),
    PassportModule.register({
      defaultStrategy: DEFAULT_STRATEGY,
    }),
  ],
  providers: [
    CreateOrganizationService,
    GetOrganizationService,
    UpdateOrganizationService,
    OrganizationRepository,
  ],
  controllers: [OrganizationController],
})
export class OrganizationModule {}

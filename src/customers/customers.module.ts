import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DEFAULT_STRATEGY } from "../shared/constants/auth.constant";
import { CustomerController } from "./controllers/customer.controller";
import { CustomerEntity } from "./entities/customer.entity";
import { CustomerRepository } from "./repositories/customer.repostiory";
import { CreateCustumerService } from "./services/create-custumer.service";
import { GetAllCustomersService } from "./services/get-all-customer.service";
import { GetCustomerByIdService } from "./services/get-customers-by-id.service";
import { UpdateCustomerService } from "./services/update-customer.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity]),
    PassportModule.register({
      defaultStrategy: DEFAULT_STRATEGY,
    }),
  ],
  providers: [
    CreateCustumerService,
    UpdateCustomerService,
    GetCustomerByIdService,
    GetAllCustomersService,
    CustomerRepository,
  ],
  controllers: [CustomerController],
})
export class CustomersModule {}

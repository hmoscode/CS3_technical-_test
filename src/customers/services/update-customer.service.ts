import { ConflictException, Injectable } from "@nestjs/common";
import { Not } from "typeorm";
import { CreateCustomerDto } from "../dtos/customer.dto";
import { CustomerRepository } from "../repositories/customer.repostiory";

@Injectable()
export class UpdateCustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async run(id: number, data: CreateCustomerDto) {
    const exists = await this.customerRepository.findOne({
      where: {
        id: Not(id),
        documentNumber: data.documentNumber,
      },
    });
    if (exists) {
      throw new ConflictException(
        "Customer with this document number already exists"
      );
    }
    await this.customerRepository.update(id, data);
  }
}

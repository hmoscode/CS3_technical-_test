import { ConflictException, Injectable } from "@nestjs/common";
import { CustomerDto } from "../dtos/customer.dto";
import { CustomerRepository } from "../repositories/customer.repostiory";

@Injectable()
export class CreateCustumerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async run(data: CustomerDto): Promise<number> {
    const exists = await this.customerRepository.findOne({
      where: {
        documentNumber: data.documentNumber,
      },
    });
    if (exists) {
      throw new ConflictException(
        "Customer with this document number already exists"
      );
    }
    const customer = this.customerRepository.create(data);
    const result = await this.customerRepository.save(customer);
    return result.id;
  }
}

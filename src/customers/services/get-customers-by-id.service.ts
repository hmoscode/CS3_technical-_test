import { Injectable, NotFoundException } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer.repostiory";

@Injectable()
export class GetCustomerByIdService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async run(id: number) {
    const exists = await this.customerRepository.existsBy({ id });
    if (!exists) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return await this.customerRepository.findOne({
      where: { id },
    });
  }
}

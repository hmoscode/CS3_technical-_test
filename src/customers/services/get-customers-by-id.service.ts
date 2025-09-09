import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer.repostiory";

@Injectable()
export class GetCustomerByIdService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async run(id: number) {
    return await this.customerRepository.findOne({
      where: { id },
    });
  }
}

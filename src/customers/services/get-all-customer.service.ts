import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer.repostiory";

@Injectable()
export class GetAllCustomersService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async run() {
    return await this.customerRepository.find();
  }
}

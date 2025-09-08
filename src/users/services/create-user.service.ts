import { ConflictException, Injectable } from "@nestjs/common";
import { hashPassword } from "@shared/utils/password.util";

import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto } from "../dtos/user.dto";

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async run(data: CreateUserDto) {
    const exists = await this.userRepository.existsBy({
      email: data.email,
    });
    if (exists) {
      throw new ConflictException("Email already in use");
    }
    data.password = await hashPassword(data.password);
    const newUser = await this.userRepository.save(data);
    return newUser.id;
  }
}

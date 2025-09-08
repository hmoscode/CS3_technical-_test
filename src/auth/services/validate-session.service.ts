import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "@users/repositories/user.repository";

@Injectable()
export class ValidateSessionService {
  constructor(private readonly userRepository: UserRepository) {}

  async run(userId: number) {
    const activeUser = await this.userRepository.findOne({
      where: { id: userId, isActive: true },
    });

    if (!activeUser) {
      throw new UnauthorizedException();
    }

    return {
      id: activeUser.id,
      email: activeUser.email,
    };
  }
}

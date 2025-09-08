import { Injectable } from "@nestjs/common";
import { DataSource, In, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
}

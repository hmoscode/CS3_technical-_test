import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ArticlesEntity } from "../entities/article.entity";
@Injectable()
export class ArticleRepository extends Repository<ArticlesEntity> {
  constructor(dataSource: DataSource) {
    super(ArticlesEntity, dataSource.createEntityManager());
  }
}

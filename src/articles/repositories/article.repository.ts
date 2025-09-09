import { DataSource, Repository } from "typeorm";
import { ArticlesEntity } from "../entities/article.entity";

export class ArticleRepository extends Repository<ArticlesEntity> {
  constructor(dataSource: DataSource) {
    super(ArticlesEntity, dataSource.createEntityManager());
  }
}

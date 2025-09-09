import { Injectable } from "@nestjs/common";
import { ArticlesEntity } from "../entities/article.entity";
import { ArticleRepository } from "../repositories/article.repository";

@Injectable()
export class GetAllArticlesService {
  constructor(private articleRepository: ArticleRepository) {}

  async run(): Promise<ArticlesEntity[]> {
    return await this.articleRepository.find();
  }
}

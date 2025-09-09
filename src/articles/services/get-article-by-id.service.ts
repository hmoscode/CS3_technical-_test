import { Injectable } from "@nestjs/common";
import { ArticleRepository } from "../repositories/article.repository";

@Injectable()
export class GetArticleByIdService {
  constructor(private articleRepository: ArticleRepository) {}

  async run(id: number) {
    return await this.articleRepository.findOneBy({ id });
  }
}

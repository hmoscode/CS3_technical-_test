import { Injectable, NotFoundException } from "@nestjs/common";
import { ArticleRepository } from "../repositories/article.repository";

@Injectable()
export class GetArticleByIdService {
  constructor(private articleRepository: ArticleRepository) {}

  async run(id: number) {
    const exists = await this.articleRepository.existsBy({ id });
    if (!exists) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return await this.articleRepository.findOneBy({ id });
  }
}

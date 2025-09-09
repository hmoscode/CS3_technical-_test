import { ConflictException, Injectable } from "@nestjs/common";
import { ArticleDto } from "../dtos/article.dto";
import { ArticleRepository } from "../repositories/article.repository";

@Injectable()
export class CreateArticleService {
  constructor(private articleRepository: ArticleRepository) {}

  async run(data: ArticleDto): Promise<number> {
    const exists = await this.articleRepository.findOneBy({ code: data.code });

    if (exists) {
      throw new ConflictException("Article with this code already exists");
    }

    const article = this.articleRepository.create(data);

    const saved = await this.articleRepository.save(article);

    return saved.id;
  }
}

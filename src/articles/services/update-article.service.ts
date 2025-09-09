import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Not } from "typeorm";
import { ArticleDto } from "../dtos/article.dto";
import { ArticleRepository } from "../repositories/article.repository";

@Injectable()
export class UpdateArticleService {
  constructor(private articleRepository: ArticleRepository) {}

  async run(id: number, data: ArticleDto) {
    const exists = await this.articleRepository.findOneBy({ id });

    if (!exists) {
      throw new NotFoundException("Article not found");
    }

    const codeExists = await this.articleRepository.findOne({
      where: {
        code: data.code,
        id: Not(id),
      },
    });
    if (codeExists) {
      throw new ConflictException("Article with this code already exists");
    }

    await this.articleRepository.update(id, data);
  }
}

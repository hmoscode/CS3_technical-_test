import { Module } from "@nestjs/common";
import { ArticleController } from "./controllers/article.controller";
import { ArticleRepository } from "./repositories/article.repository";
import { CreateArticleService } from "./services/create-article.service";
import { GetAllArticlesService } from "./services/get-all-articles.service";
import { GetArticleByIdService } from "./services/get-article-by-id.service";
import { UpdateArticleService } from "./services/update-article.service";

@Module({
  providers: [
    CreateArticleService,
    UpdateArticleService,
    GetAllArticlesService,
    GetArticleByIdService,
    ArticleRepository,
  ],
  controllers: [ArticleController],
})
export class ArticlesModule {}

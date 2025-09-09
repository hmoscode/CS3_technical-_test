import { Module } from '@nestjs/common';
import { CreateArticleService } from './services/create-article.service';
import { UpdateArticleService } from './services/update-article.service';
import { GetAllArticlesService } from './services/get-all-articles.service';
import { GetArticleByIdService } from './services/get-article-by-id.service';
import { ArticleController } from './controllers/article.controller';

@Module({
  providers: [CreateArticleService, UpdateArticleService, GetAllArticlesService, GetArticleByIdService],
  controllers: [ArticleController]
})
export class ArticlesModule {}

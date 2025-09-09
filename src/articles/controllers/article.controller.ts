import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  CREATED_MESSAGE,
  UPDATED_MESSAGE,
} from "../../shared/constants/messages.constant";
import {
  CreatedRecordResponseDto,
  UpdateRecordResponseDto,
} from "../../shared/dtos/response.dto";
import { ArticleDto } from "../dtos/article.dto";
import { CreateArticleService } from "../services/create-article.service";
import { GetAllArticlesService } from "../services/get-all-articles.service";
import { GetArticleByIdService } from "../services/get-article-by-id.service";
import { UpdateArticleService } from "../services/update-article.service";

@Controller("article")
@ApiTags("Articles")
export class ArticleController {
  constructor(
    private readonly getAllArticlesService: GetAllArticlesService,
    private readonly createArticleService: CreateArticleService,
    private readonly updateArticleService: UpdateArticleService,
    private readonly getArticleByIdService: GetArticleByIdService
  ) {}

  @Post()
  @ApiOkResponse({
    type: CreatedRecordResponseDto,
  })
  @ApiOperation({
    summary: "Create a new article",
    description: "Create a new article",
  })
  async create(@Body() data: ArticleDto): Promise<CreatedRecordResponseDto> {
    const id = await this.createArticleService.run(data);
    return {
      message: CREATED_MESSAGE,
      data: {
        rowId: id,
      },
      statusCode: HttpStatus.OK,
    };
  }

  @Get()
  @ApiOkResponse({
    type: ArticleDto,
    isArray: true,
  })
  @ApiOperation({
    summary: "Get all articles",
    description: "Retrieve a list of all articles",
  })
  async findAll() {
    return await this.getAllArticlesService.run();
  }

  @Get(":id")
  @ApiOkResponse({
    type: ArticleDto,
  })
  @ApiOperation({
    summary: "Get article by ID",
    description: "Retrieve a single article by its ID",
  })
  async findOne(@Param("id") id: number) {
    return await this.getArticleByIdService.run(id);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update article",
    description: "Update an existing article",
  })
  async update(
    @Param("id") id: number,
    @Body() data: ArticleDto
  ): Promise<UpdateRecordResponseDto> {
    await this.updateArticleService.run(id, data);
    return {
      message: UPDATED_MESSAGE,
      statusCode: HttpStatus.OK,
    };
  }
}

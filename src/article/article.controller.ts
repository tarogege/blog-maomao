import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
    constructor(
        private articleService: ArticleService
    ) {}

    @Get()
    getArticles(@Query('tag') tag: string, @Query('author') author: string, @Body('limit') limit: number, @Body('page') page: number ) {
        // @param @query @body
        return this.articleService.getArticles({tag, author, limit, page})
    }
}

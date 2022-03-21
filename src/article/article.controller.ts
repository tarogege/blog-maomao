import { Body, Controller, Get, Param, Post, Query, Headers } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.schema';

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

    @Get()
    getArticleDetail(@Param('id') id: string) {
        return this.articleService.getArticleDetail(id)
    }

    @Post()
    createArtivle(@Body('article') article: Article, @Headers('authorization') token: string) {
        return this.articleService.createArticle(article, token)
    }
}

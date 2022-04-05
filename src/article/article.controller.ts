import { Body, Controller, Get, Param, Post, Query, Headers, Put, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.schema';
import { identity } from 'rxjs';

@Controller('articles')
export class ArticleController {
    constructor(
        private articleService: ArticleService
    ) {}

    @Get()
    getArticles(@Query('tag') tag: string, @Query('author') author: string, @Query('name') name: string, @Query('limit') limit: number, @Query('page') page: number ) {
        // @param @query @body
        return this.articleService.getArticles({tag, author, limit, page, name})
    }

    @Get(':id')
    getArticleDetail(@Param('id') id: string) {
        return this.articleService.getArticleDetail(id)
    }

    @Post()
    createArtivle(@Body('article') article: Article, @Headers('authorization') token: string) {
        return this.articleService.createArticle(article, token)
    }

    @Put(':id')
    updateArticle(@Param('id') id: string, @Body('article') article: Article, @Headers('authorization') token: string) {
        return this.articleService.updateArticle(id, article, token)
    }

    @Delete(':id')
    deleteArticle(@Headers('authorization') token: string, @Param('id') id: string) {
        return this.articleService.deleteArticle(token, id)
    }
}

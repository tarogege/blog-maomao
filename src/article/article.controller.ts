import { Controller } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
    constructor() {
        private articleService: ArticleService
    }

    // 获取文章列表
    @Get()
    getArticless() {
        return this.articleService.getArticles()
    }
}

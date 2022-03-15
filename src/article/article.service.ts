import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { ArticleDocument } from './article.schema';

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel('ArticleModule')
        private articleModel: Model<ArticleDocument>
    ) {}
    async getArticles() {
        return {}
    }
}

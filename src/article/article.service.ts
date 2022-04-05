import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleDocument } from './article.schema';
import { Model } from 'mongoose'
import { AuthService } from 'src/auth/auth.service';
import { NotFoundException } from '@nestjs/common';
import { Article } from './article.schema';

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel('ArticleModel')
        private articleModel: Model<ArticleDocument>,
        private authServive: AuthService
    ) {}

    // 文章列表
    async getArticles({tag, author, name, limit = 10, page = 0}) {
        // 根据一些查询参数进行筛选artilce并且分页
        const query: any = {}
        if (tag) {
            query.tag = decodeURIComponent(tag)
        }
        if (author) {
            query.author = decodeURIComponent(author)
        }
        if (name) {
            query.title = decodeURIComponent(name)
        }
        console.log(query, 'query')
        const articles = await this.articleModel.find(query).skip(limit*page).limit(limit)
        return { articles }
    }

    // 文章详情
    async getArticleDetail(id: string) {
        const article = await this.articleModel.findById(id)
        if (!article) {
            throw new NotFoundException('文章不存在')
        }
        return {article}
    }

    // 创建文章
    async createArticle(article: Article, token: string) {
        if (!token) {
            throw new UnauthorizedException('无权限')
        }
        const userInfo = await this.authServive.verify(token)
        article.author = userInfo?.id
        let newArticle = new this.articleModel(article)
        newArticle = await newArticle.save()
        return { article: newArticle }
    }

    // 更新文章
    async updateArticle(id: string, article: Article, token: string) {
        if (!token) {
            throw new UnauthorizedException('无权限')
        }
        const userInfo = await this.authServive.verify(token)
        let newArticle = await this.articleModel.findById(id)
        if (!newArticle) {
            throw new NotFoundException('找不到文章')
        }
        if (newArticle?.author?.id !== userInfo?.id) {
            throw new UnauthorizedException('无权限')
        }
        newArticle = await this.articleModel.findByIdAndUpdate(id, article)
        return { article: newArticle }
    }

    // 删除文章
    async deleteArticle(token: string, id: string) {
        if (!token) {
            throw new UnauthorizedException('无权限')
        }
        const userInfo = await this.authServive.verify(token)
        let article = await this.articleModel.findById(id)
        if (!article) {
            throw new NotFoundException('找不到文章')
        }
        if (article?.author?.id !== userInfo?.id) {
            throw new UnauthorizedException('无权限')
        }
        article = await this.articleModel.findByIdAndDelete(id)
        return {}
    }
}

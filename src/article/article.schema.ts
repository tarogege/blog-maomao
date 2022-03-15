import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ArticleDocument = Article & Document

@Schema()
export class Article {
    @Prop()
    slug: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    body: string;

    @Prop()
    tagList： string;

    @Prop({ value: Date.now })
    createdAt: Date;

    @Prop({ value: Date.now })
    "updatedAt": Date,

    @Prop()
    "favorited": boolean;

    @Prop()
    favoritesCount: number;

    // "author": {
    //   "username": "jake",
    //   "bio": "I work at statefarm",
    //   "image": "https://i.stack.imgur.com/xHWG8.jpg",
    //   "following": false
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
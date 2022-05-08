import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserDocument } from 'src/users/user.schema';
import * as mongoose from 'mongoose';

export type ArticleDocument = Article & Document;

// 通过添加timeStaps选项，自动添加createAt和updatedAt字段，type：Date，defatul：Date.now
@Schema({timestamps: true})
export class Article {
    @Prop()
    "slug": string;

    @Prop()
    "title": string;

    @Prop()
    "description": string;

    @Prop()
    "body": string;

    @Prop({ })
    "tagList": string[];

    @Prop()
    "favorited": boolean;

    @Prop()
    "favoritesCount": number;

    @Prop({ ref: 'UserModel', type: mongoose.Schema.Types.ObjectId })
    "author": UserDocument
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
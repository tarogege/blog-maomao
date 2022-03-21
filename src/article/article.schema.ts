import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserDocument } from 'src/users/user.schema';

export type ArticleDocument = Article & Document;

@Schema()
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

    @Prop({ value: Date.now() })
    "createdAt": Date;

    @Prop({ value: Date.now() })
    "updatedAt": Date;

    @Prop()
    "favorited": boolean;

    @Prop()
    "favoritesCount": number;

    @Prop({ ref: 'UserModel' })
    "author": UserDocument
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './article.schema'

@Module({
  imports: [MongooseModule.forFeature({ name: 'ArticleModule', schema: ArticleSchema })],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}

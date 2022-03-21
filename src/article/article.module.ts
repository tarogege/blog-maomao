import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './article.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'ArticleModel', schema: ArticleSchema }])
  ],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}

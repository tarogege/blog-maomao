import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

const localDbUrl =
  'mongodb://admin:123456@localhost:27017/nest?authSource=admin';

  const uri = process.env.MONGODB_URI;
  console.log(uri)
  // const testUrl = 'mongodb+srv://admin:maomao1234@0.0.0.0:27017/nest?authSource=admin'
@Module({
  imports: [UsersModule, MongooseModule.forRoot(testUrl), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

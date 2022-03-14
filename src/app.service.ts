import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('maomao')
    return 'Hello World!';
  }
}

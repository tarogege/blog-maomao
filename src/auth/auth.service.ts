import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ){}

    // 签发
    async sign(value) {
        const result = await this.jwtService.signAsync(value)
        return result
    }

    // 验证
   async verify(value: any) {
       const token = value.split('Bearer ')[1]
       console.log(token, 'tokennnnn')
       try {
        const result = await this.jwtService.verifyAsync(token)
        return result
       } catch(err) {
           throw new NotFoundException('token校验失败')
       }
   }
}

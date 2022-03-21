import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './user.schema';
import { Model } from 'mongoose'
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('UserModel')
        private userModel: Model<UserDocument>,
        private authService: AuthService
    ) {}

    // 注册
    async regist(user: User) {
        let newUser = new this.userModel(user)
        newUser = await newUser.save()
        return { user: newUser }
    }

    // login
    async login(user: User) {
        let one = await  this.userModel.findOne(user)
        if (!one) {
            throw new NotFoundException('用户不存在')
        }
        const token = await this.authService.sign({ userId: one._id })
        const newUser = one.toJSON() as any
        newUser.token = token
        return {user: newUser}
    }

    // get current
    async getUser(token: string) {
        console.log(token, 'token')
        if (!token) {
            throw new UnauthorizedException('无权限')
        }
        const userInfo = await this.authService.verify(token)
        const userOne = await this.userModel.findById(userInfo?.userId)
        if (!userOne) {
            throw new NotFoundException('用户不存在')
        }
        return { user: userOne }
    }

    async update(user: User, token: string) {
        if (!token) {
            throw new UnauthorizedException('无权限')
        }
        const userInfo = await this.authService.verify(token)
        const userOne = await this.userModel.findById(userInfo?.userId)
        if (!userOne) {
            throw new NotFoundException('用户不存在')
        }
        const newUser = await this.userModel.findByIdAndUpdate(userInfo?.id, user)
        return { user: newUser }
    }
}

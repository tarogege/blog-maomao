import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './user.schema';
import { Model } from 'mongoose'
import { NotFoundError } from 'rxjs';
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
            throw new NotFoundError('用户不存在')
        }
        const token = await this.authService.sign({ userId: one._id })
        const newUser = one.toJSON() as any
        newUser.token = token
        return {user: newUser}
    }

    // get current
    async getUser(token: string) {
        console.log(token, 'token')
<<<<<<< HEAD
        const userInfo = await this.authService.verify(token)
        const userOne = await this.userModel.findById(userInfo?.userId)
        if (!userOne) {
            throw new NotFoundError('用户不存在')
=======
        if (token) {
            const userInfo = await this.authService.verify(token.slice(7))
            const userOne = await this.userModel.findById(userInfo?.userId)
            if (!userOne) {
                throw new NotFoundError('用户不存在')
            }
            return { user: userOne }
>>>>>>> 89a82b4266b4eb0ae894969edfa230186d7f8b9a
        }
        throw new NotFoundError('无权限')
    }

    async update(user: User, token: string) {
<<<<<<< HEAD
        const userInfo = await this.authService.verify(token)
        const userOne = this.userModel.findById(userInfo?.userId)
        if (!userOne) {
            throw new NotFoundError('用户不存在')
=======
        if (token) {
            const userInfo = await this.authService.verify(token.slice(7))
            const userOne = this.userModel.findById(userInfo?.userId)
            if (!userOne) {
                throw new NotFoundError('用户不存在')
            }
            await this.userModel.updateOne({_id: userInfo?.userId}, {$set: user})
            return '更新成功'
>>>>>>> 89a82b4266b4eb0ae894969edfa230186d7f8b9a
        }
        throw new NotFoundError('无权限')
    }
}

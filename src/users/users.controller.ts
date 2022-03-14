import { Body, Controller, Get, Post, Headers, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
   constructor(private userService: UsersService) {}

    // 注册
  @Post()
    regist(@Body('user') user) {
        // console.log(body, 'body')
    return this.userService.regist(user);
    }

    // 登录
    @Post('/login')
    login(@Body('user') user) {
        return this.userService.login(user)
    }

    // get current
    @Get()
    getUser(@Headers('authorization') token: string) {
        return this.userService.getUser(token)
    }

    @Put()
    updateUser(@Body('user') user, @Headers('authorization') token: string) {
        return this.userService.update(user, token)
    }
}

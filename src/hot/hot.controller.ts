import { Controller, Get } from '@nestjs/common';
import { HotService } from './hot.service';

@Controller('hot')
export class HotController {
    constructor (
        private hotService: HotService
    ) {}

    // 获取沸点列表
    @Get()
    getHot() {
        return this.hotService.getHot()
    }
}

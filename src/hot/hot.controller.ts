import { Controller, Get, Param } from '@nestjs/common';
import { get } from 'superagent';
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

    @Get(':id')
    getHotDetail(@Param('id') id: string) {
        return this.hotService.getHotDetail(id)
    }
}

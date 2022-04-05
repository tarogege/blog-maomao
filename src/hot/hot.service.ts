import { Injectable } from '@nestjs/common';
const superagent = require('superagent')
// const cheerio = require('cheerio')
const cheerio = require('cheerio')

@Injectable()
export class HotService {
    async getHot() {
        console.log('superagent')
        try {
            const res = await superagent.get('https://cnodejs.org/')
            const $ = cheerio.load(res.text)
            // text = res
            // console.log(res?.text.includes('pin-list'), '$')
            const hotList = $('#topic_list .cell')
            console.log(hotList, 'hot')
            const resObj = $(hotList).map((idx, item) => {
                const avatar = $(item).find('.user_avatar img').attr('src')
                console.log(avatar)
                const title =  $(item).find('.topic_title').text().trim().split('\n')[0]
                const lastActiveTime = $(item).find('.last_active_time').text().trim().split('\n')[0]
                const repliesCount = $(item).find('.count_of_replies').text().trim().split('\n')[0]
                const visitCount = $(item).find('.count_of_visits').text().trim().split('\n')[0]
                return {
                    avatar,
                    title,
                    lastActiveTime,
                    repliesCount,
                    visitCount,
                }
            }).toArray()
                
            return {res: resObj}
        } catch(err) {
            console.log(err, 'myerr')
            if (err) {
                return err
            }
        }
    }
}
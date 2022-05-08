import { Injectable } from '@nestjs/common';
const superagent = require('superagent')
// const cheerio = require('cheerio')
const cheerio = require('cheerio')

@Injectable()
export class HotService {
    async getHot() {
        // console.log('superagent')
        try {
            const res = await superagent.get('https://cnodejs.org/')
            const $ = cheerio.load(res.text)
            // text = res
            // console.log(res?.text.includes('pin-list'), '$')
            const hotList = $('#topic_list .cell')
            // console.log(hotList, 'hot')
            const resObj = $(hotList).map((idx, item) => {
                const avatar = $(item).find('.user_avatar img').attr('src')
                const username = $(item).find('.user_avatar img').attr('title')
                // console.log(avatar)
                const title =  $(item).find('.topic_title').text().trim().split('\n')[0]
                const lastActiveTime = $(item).find('.last_active_time').text().trim().split('\n')[0]
                const repliesCount = $(item).find('.count_of_replies').text().trim().split('\n')[0]
                const visitCount = $(item).find('.count_of_visits').text().trim().split('\n')[0]
                const id = $(item).find('.topic_title').attr('href')?.slice(7)
                return {
                    avatar,
                    title,
                    lastActiveTime,
                    repliesCount,
                    visitCount,
                    username,
                    id
                }
            }).toArray().slice(4)
                
            return {res: resObj}
        } catch(err) {
            console.log(err, 'myerr')
            if (err) {
                return err
            }
        }
    }

    async getHotDetail (id: string) {
        try {
            const res = await superagent.get(`https://cnodejs.org/topic/${id}`)
            const $ = cheerio.load(res?.text)
            const contentWrapepr = $('.panel:first-child')
            const title = $(contentWrapepr).find('.topic_full_title').text().trim()
            const content = $(contentWrapepr).find('.markdown-text').html()
            const author = $(contentWrapepr).find('.changes a').text()
            const replyWrapper = $('.panel:nth-child(2)')
            const commentsArr = $(replyWrapper).find('.reply_item')
            const comments = $(commentsArr).map(
                (idx, item) => {
                    return {
                        avatar: $(item).find('.user_avatar img').attr('src'),
                        name: $(item).find('.user_avatar img').attr('title'),
                        replyTime: $(item).find('.reply_time').text(),
                        content: $(item).find('.markdown-text').html()
                    }
                }
            ).toArray()
            console.log(commentsArr, 'comments')
            return {
                title,
                content,
                author,
                comments
            }
        } catch (err) {
            if (err) {
                return err
            }
        }
        
    }
}

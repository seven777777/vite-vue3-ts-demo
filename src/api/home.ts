import request from '@/utils/request'

// 最新动态获取
export const getNews = () => {
    return request({
        method: 'get',
        url: '/home/news'
    })
}

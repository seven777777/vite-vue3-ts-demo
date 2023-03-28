import request from '@/server'

// 最新动态获取
export const getNews = () => {
    return request({
        method: 'get',
        url: '/home/news',
        noLoading: true
    })
}
// 最新动态获取
export const getTradeVolumn = (params: { startDate: string; endDate: string }) => {
    return request({
        method: 'post',
        url: '/tradeVolumn',
        params
        // noLoading: true
    })
}
// 地图打点获取
export const getMapMark = () => {
    return request({
        method: 'get',
        url: '/mapmark'
    })
}

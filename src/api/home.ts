import request from '@/server'
import type { VolumnRequest, InvisorRankRequest } from '@/types/home.type'

// 最新动态获取
export const getNews = () => {
    return request({
        method: 'get',
        url: '/home/news',
        noLoading: true
    })
}
// 成交量价获取
export const getTradeVolumn = (params: VolumnRequest) => {
    return request({
        method: 'post',
        url: '/tradeVolumn',
        params,
        noLoading: true
    })
}
// 房企拿地排行获取
export const getInvisorRank = (params: InvisorRankRequest) => {
    return request({
        method: 'post',
        url: '/invisorRank',
        params,
        noLoading: true
    })
}
// 地图打点获取
export const getMapMark = () => {
    return request({
        method: 'get',
        url: '/mapmark'
    })
}

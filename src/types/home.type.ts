import type { TimeRange } from './common.type'
// 新闻
export interface INewList {
    id: number
    content: string
    date: string
    type: string
    city: string
}

// 成交量价
export interface VolumnRequest extends TimeRange {
    timeType: 'year' | 'month' | 'day'
}
// 房企拿地排行
export interface InvisorParam {
    limit: number
    useType: string
}
export interface InvisorRankRequest extends TimeRange, InvisorParam {}

// 地块列表
export interface LandListParam {
    page: number //页码
    sOrderField: string //排序指标
    landType: string[] //地块类型
}
export interface LandListRequest extends TimeRange, LandListParam {}
// export interface LandListRequest extends TimeRange {
//     LandState: string[] //土地现状
//     LandTradeState: string[] //交易现状
//     page: number //页码
//     sOrderField: string //排序指标
//     landType: string[] //地块类型
// }

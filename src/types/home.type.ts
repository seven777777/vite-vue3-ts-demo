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

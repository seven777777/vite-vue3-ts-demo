import * as echarts from 'echarts'
import { colorToRGBA } from '@/utils/tool'
/**
 * 图表color配置
 * @param {*} color
 */
export function ChartColorSet(color: string | string[]) {
    // 单个颜色直接返回
    if (typeof color === 'string') return color

    // 数组类型，返回图标渐变设置
    if (Array.isArray(color) && color.length === 2) {
        return {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                {
                    offset: 0,
                    color: color[0]
                }, // 设置颜色渐变
                {
                    offset: 1,
                    color: color[1]
                }
            ]
        }
    } else {
        throw Error('color必须为一个长度为2的数组，或是一个色值！！！')
    }
}

/**
 * 折线渐变区域色值配置
 * @param {*} color
 */
export function ChartLineAreaSet(color: string | string[]) {
    // 单个颜色直接返回
    if (typeof color === 'string') {
        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 0,
                color: colorToRGBA(color, 0.2)
            },
            {
                offset: 1,
                color: colorToRGBA(color, 0)
            }
        ])
    }

    // 数组类型，返回图标渐变设置
    if (Array.isArray(color) && color.length === 2) {
        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 0,
                color: color[0]
            },
            {
                offset: 1,
                color: color[1]
            }
        ])
    } else {
        throw Error('color必须为一个长度为2的数组，或是一个色值！！！')
    }
}

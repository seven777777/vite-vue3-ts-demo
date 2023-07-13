import type { EChartsOption } from 'echarts'
import { ChartColorSet, ChartLineAreaSet, ChartGrid } from '@/utils/echartsOptionTool'

export interface SeriesItem {
    data: (number | object)[]
    type: any
    unit: string
    name?: string
    color?: string | string[]
}
export interface ChartParam {
    xAxisData: string[]
    seriesList: SeriesItem[]
}

export const getBaseOpt = (opt: ChartParam): EChartsOption => {
    const { xAxisData, seriesList } = opt
    const getSeries = (seriesList: SeriesItem[]): any => {
        return seriesList.map(item => {
            return {
                ...(item.name ? { name: item.name } : {}),
                type: item.type,
                data: item.data,
                ...(item.type == 'bar'
                    ? {
                          barWidth: 12,
                          itemStyle: {
                              borderRadius: [2, 2, 0, 0],
                              ...(item.color ? { color: ChartColorSet(item.color) } : {})
                          }
                      }
                    : item.type == 'line'
                    ? {
                          smooth: true,
                          ...(item.color
                              ? {
                                    itemStyle: {
                                        color: item.color
                                    },
                                    areaStyle: {
                                        color: ChartLineAreaSet(item.color)
                                    }
                                }
                              : {})
                      }
                    : {})
            }
        })
    }
    return {
        backgroundColor: 'transparent',
        grid: ChartGrid,
        xAxis: {
            type: 'category',
            data: xAxisData
        },
        yAxis: {
            type: 'value'
        },
        series: getSeries(seriesList)
    }
}

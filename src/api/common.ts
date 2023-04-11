/**
 * 公共基础接口封装
 */
import request from '@/server'
import { areaList, type AreaItem } from '@/mock/area'
import { cityList, type CityItem } from '@/mock/city'

// 获取地区信息
export const getAreaData = () => {
    return new Promise((res: (value: AreaItem[]) => void) => {
        setTimeout(() => {
            res(areaList)
        }, 1000)
    })
}
// 获取城市信息
export const getCityData = () => {
    return new Promise((res: (value: CityItem[]) => void) => {
        setTimeout(() => {
            res(cityList)
        }, 1000)
    })
}

/**
 * 公共基础接口封装
 */
import request from '@/server'
import { areaList } from '@/mock/area'
import { cityList } from '@/mock/city'

// 获取地区信息
export const getAreaData = () => {
    return new Promise(res => {
        setTimeout(() => {
            res(areaList)
        }, 1000)
    })
}
// 获取城市信息
export const getCityData = () => {
    return new Promise(res => {
        setTimeout(() => {
            res(cityList)
        }, 1000)
    })
}

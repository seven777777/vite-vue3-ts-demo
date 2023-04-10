/*
 * @Author: seven.zhang
 * @Date: 2023-04-10 14:52:07
 * @Last Modified by: seven.zhang
 * @Last Modified time: 2023-04-10 17:27:35
 */
import { useThemeStore } from '@/stores/theme'
import { watchEffect } from 'vue'
const themeStore = useThemeStore()

export class aMapUtil {
    aMap: AMap.Map
    constructor(el: string = 'landMap', opt: AMap.MapOptions = {}) {
        this.aMap = new AMap.Map(el, {
            center: [116.480983, 39.989628], //中心点
            zoom: 11, //缩放级别
            mapStyle: themeStore.mapStyle,
            viewMode: '2D', //模式
            ...opt
        })
        //地图主题设置
        watchEffect(() => {
            this.aMap.setMapStyle(themeStore.mapStyle)
        })
    }
}

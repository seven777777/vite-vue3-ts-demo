/*
 * @Author: seven.zhang
 * @Date: 2023-04-10 14:52:07
 * @Last Modified by: seven.zhang
 * @Last Modified time: 2023-04-11 16:16:47
 */
import { useThemeStore } from '@/stores/theme'
import { watchEffect } from 'vue'
const themeStore = useThemeStore()

const BASD_POSITION = [116.480983, 39.989628]

export class aMapUtil {
    aMap: AMap.Map
    constructor(el: string = 'landMap', opt: AMap.MapOptions = {}) {
        this.aMap = new AMap.Map(el, {
            center: BASD_POSITION, //中心点
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

    drawDiyMark(opt: AMap.MarkerOptions): AMap.Marker {
        const marker: AMap.Marker = new AMap.Marker({
            position: BASD_POSITION,
            offset: new AMap.Pixel(0, 0),
            anchor: 'center',
            ...opt
        })
        this.setHoverIndex(marker)
        marker.setMap(this.aMap)
        return marker
    }

    setHoverIndex(marker: AMap.Marker) {
        const defaultIndex: number = marker.getzIndex()
        marker.on('mouseover', () => {
            marker.setzIndex(10000)
        })
        marker.on('mouseout', () => {
            marker.setzIndex(defaultIndex)
        })
    }
}

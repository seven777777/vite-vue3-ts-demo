<template>
    <div class="base-box land-search-box">
        <div class="land-search-map">
            <div class="map-main" id="landMap"></div>
        </div>
        <div class="land-search-list">
            <div class="list-head">
                <module-head title="列表" />
            </div>
            <ul class="list-main">
                <li v-for="(area, i) in areaData" :key="i">{{ area.sAreaOrCity }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import ModuleHead from '@/components/ModuleHead.vue'
import { onMounted, ref } from 'vue'
import { aMapUtil } from '@/utils/aMapUtil'
import type { AreaItem } from '@/mock/area'
import type { CityItem } from '@/mock/city'
import { getAreaData, getCityData } from '@/api/common'
import { areaCircle, cityCircle } from '@/utils/aMapMarkDom'

let mapUtil: aMapUtil
let map: AMap.Map
onMounted(() => {
    mapUtil = new aMapUtil()
    map = mapUtil.aMap
})

const areaData = ref<AreaItem[]>([])
const getAreaList = () => {
    getAreaData().then((res: AreaItem[]) => {
        areaData.value = res
        areaData.value.forEach((e: AreaItem) => {
            const mark = mapUtil.drawDiyMark({
                position: [e.sLng, e.sLat],
                content: areaCircle(e)
            })

            mark.on('click', () => {
                getCityList()
            })
        })
        map.setFitView()
    })
}
const cityData = ref<CityItem[]>([])
const getCityList = () => {
    getCityData().then((res: CityItem[]) => {
        map.clearMap()
        cityData.value = res
        cityData.value.forEach((e: CityItem) => {
            mapUtil.drawDiyMark({
                position: [e.sLng, e.sLat],
                content: cityCircle(e)
            })
        })
        map.setFitView()
    })
}
onMounted(() => {
    getAreaList()
})
</script>

<style lang="scss" scoped>
.land-search-box {
    height: calc(100vh - 80px);
    display: flex;
}
.land-search-map {
    flex: 1;
    .map-main {
        width: 100%;
        height: 100%;
    }
}
.land-search-list {
    width: 300px;
    position: relative;
    z-index: 10;
    box-shadow: -2px 0 8px 2px var(--box-shadow-color);
    display: flex;
    flex-direction: column;
    .list-head {
        box-shadow: var(--box-shadow);
    }
    .list-main {
        flex: 1;
        overflow-y: auto;
    }
}
</style>

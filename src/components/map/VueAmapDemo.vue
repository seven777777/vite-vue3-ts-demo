<template>
    <el-amap :mapStyle="themeStore.mapStyle" :center="center" :zoom="zoom" @init="init">
        <el-amap-marker v-for="(mark, index) in markList" :key="index" :position="[mark.lng, mark.lat]">
            <div style="padding: 5px 10px; white-space: nowrap; background: blue; color: #fff">测试content</div>
        </el-amap-marker>
    </el-amap>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getMapMark } from '@/api/home'
import { useThemeStore } from '@/stores/theme'
let themeStore = useThemeStore()

const zoom = ref(12)
const center = ref([121.59996, 31.197646])
let map: any = null
const init = (e: any) => {
    const marker = new AMap.Marker({
        position: [121.59996, 31.197646]
    })
    e.add(marker)
    map = e
    console.log('map init: ', map)
}

// 地图打点
interface IMarkPoint {
    lng: number
    lat: number
}
let markList = ref<IMarkPoint[]>([])
getMapMark().then(res => {
    markList.value = res.data
})
</script>

<style lang="scss" scoped></style>

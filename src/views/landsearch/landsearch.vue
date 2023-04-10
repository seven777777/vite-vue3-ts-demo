<template>
    <div class="base-box land-search-box">
        <div class="land-search-map">
            <div class="map-main" id="landMap"></div>
        </div>
        <div class="land-search-list">
            <div class="list-head">
                <module-head title="列表" />
            </div>
            <div class="list-main"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ModuleHead from '@/components/ModuleHead.vue'
import { onMounted } from 'vue'
import { aMapUtil } from '@/utils/aMapUtil'
let mapUtil: aMapUtil
let map: AMap.Map
onMounted(() => {
    mapUtil = new aMapUtil()
    map = mapUtil.aMap
    map.on('complete', () => {
        console.log(1111)
    })
    console.log(333)
})
onMounted(() => {
    console.log(2222, map)
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

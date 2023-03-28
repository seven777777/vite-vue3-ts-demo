<template>
    <el-row :gutter="10" class="home-header">
        <el-col :span="6">
            <div class="base-box">
                <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始"
                    end-placeholder="结束"
                    value-format="YYYY-MM-DD"
                    :unlink-panels="true"
                    placement="bottom-start"
                    :clearable="false"
                />
            </div>
        </el-col>
        <el-col :span="18">
            <div class="base-box news-wrap">
                <div class="news-pic"></div>
                <div class="swiper-box">
                    <swiper-component :list="newsList"></swiper-component>
                </div>
            </div>
        </el-col>
    </el-row>

    <el-row :gutter="10" class="m_t_15">
        <el-col :span="12">
            <div class="base-box">
                <BaseEchart :options="chartData.options" height="400px" @echartClick="clickChart"></BaseEchart>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="base-box map-box">
                <el-amap
                    ref="myMap"
                    :mapStyle="themeStore.mapStyle"
                    :events="events"
                    :center="center"
                    :zoom="zoom"
                    @init="init"
                >
                    <el-amap-marker v-for="(mark, index) in markList" :key="index" :position="[mark.lng, mark.lat]">
                        <div style="padding: 5px 10px; white-space: nowrap; background: blue; color: #fff">
                            测试content
                        </div>
                    </el-amap-marker>
                </el-amap>
            </div>
        </el-col>
    </el-row>

    <el-button @click="add">发送请求</el-button>
    <el-button @click="cancelRequest('/tradeVolumn')">取消请求22</el-button>
    <el-button @click="cancelAllRequest">取消全部请求</el-button>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import type { INewList } from '@/types/home.type'
import { getNews, getTradeVolumn, getMapMark } from '@/api/home'
import { onMounted, reactive, ref, defineAsyncComponent } from 'vue'
import BaseEchart from '@/components/chart/BaseEchart.vue'
import { getBaseOpt } from '@/utils/echartsOptionFactory'
import { cancelRequest, cancelAllRequest } from '@/server'
import { useThemeStore } from '@/stores/theme'

let themeStore = useThemeStore()

const value1 = ref(['2022-10-01', '2023-03-10'])

const swiperComponent = defineAsyncComponent({
    loader: () => import('./components/VerticalSwiper.vue'),
    loadingComponent: Loading
})
let newsList: INewList[] = reactive([])

const chartData = reactive({
    options: {}
})
const baseParam = { startDate: value1.value[0], endDate: value1.value[1] }

function clickChart(param: any) {
    console.log(param)
}

const request = () => {
    setTimeout(() => {
        getNews().then(res => {
            newsList.push(...res.data)
        })
        getTradeVolumn(baseParam).then(res => {
            chartData.options = getBaseOpt(res.data)
        })
    }, 0)
}
request()

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
const add = () => {
    const marker = new AMap.Marker({
        position: [121.59996, 31.177646]
    })
    map.add(marker)
}

interface IMarkPoint {
    lng: number
    lat: number
}
let markList = ref<IMarkPoint[]>([])
getMapMark().then(res => {
    markList.value = res.data
})
let events = ref({})
onMounted(() => {
    let myMap = ref()
    events.value = {
        complete: () => {
            console.log(myMap.value)
            myMap.value.$$getInstance().setFitView()
        }
    }
    // var map = new AMap.Map('container', {
    //     zoom: 12
    // })
})
</script>

<style lang="scss" scoped>
.home-header {
    height: 42px;
    .base-box {
        height: 100%;
        :deep(.el-range-editor--small.el-input__wrapper) {
            width: 100%;
            height: 100%;
            box-shadow: none;
        }
    }
}
.news-wrap {
    display: flex;
    align-items: center;
    padding: 0 8px 0 16px;
}
.news-pic {
    flex-shrink: 0;
    width: 75px;
    height: 15px;
    @include abs-bg('news-light.png');
}
#{themeWrap('dark')} {
    .news-pic {
        @include abs-bg('news-deep.png');
    }
}
.swiper-box {
    width: calc(100% - 90px);
    height: 42px;
    margin-left: 15px;
}

.map-box {
    height: 400px;
}
</style>

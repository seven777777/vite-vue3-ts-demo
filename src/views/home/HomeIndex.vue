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
                <swiper
                    v-if="newsList.length"
                    class="swiper-box"
                    direction="vertical"
                    :autoplay="{ delay: 2600, pauseOnMouseEnter: true }"
                    :loop="true"
                    :modules="[Autoplay]"
                    @click="swiperClick"
                >
                    <swiper-slide class="swiper-item" v-for="news in newsList" :key="news.id">
                        <div class="innerText link" :data-id="news.id">
                            <span :style="{ '--tag-color': LandTypeColor[news.type] + '' }">
                                【{{ news.type }}-{{ news.city }}】
                            </span>
                            {{ news.content }}
                        </div>
                    </swiper-slide>
                </swiper>
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
                    mapStyle="amap://styles/3fafc0b2658699a7754958d71361f1f2"
                    :center="center"
                    :zoom="zoom"
                    @init="init"
                />
            </div>
        </el-col>
    </el-row>

    <el-button @click="add">发送请求</el-button>
    <el-button @click="cancelRequest('/tradeVolumn')">取消请求</el-button>
    <el-button @click="cancelAllRequest">取消全部请求</el-button>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper'
import 'swiper/scss'
import { getNews, getTradeVolumn } from '@/api/home'
import { onMounted, reactive, ref } from 'vue'
import { LandTypeColor } from '@/config/land.config'
import BaseEchart from '@/components/chart/BaseEchart.vue'
import { getBaseOpt } from '@/utils/echartsOptionFactory'
import { cancelRequest, cancelAllRequest } from '@/server'

const value1 = ref(['2022-10-01', '2023-03-10'])
const swiperClick: (swiper: any, event: any) => void = (swiper, event) => {
    console.log(event.target.getAttribute('data-id'))
}
interface INewList {
    id: number
    content: string
    date: string
    type: string
    city: string
}
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
onMounted(() => {
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
    flex: 1;
    height: 42px;
    margin-left: 15px;
    .swiper-item {
        height: 100%;
        display: flex;
        align-items: center;
        .innerText {
            @include one_line_hidden;
            span {
                color: var(--tag-color);
            }
        }
    }
}

.map-box {
    height: 400px;
}
</style>

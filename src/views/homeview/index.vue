<template>
    <el-row :gutter="10" class="home-header">
        <el-col :span="6">
            <div class="base-box">
                <el-date-picker
                    v-model="dataRange"
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
                <BaseEchart :options="chartData.options" height="400px"></BaseEchart>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="base-box map-box">
                <base-select
                    width="250px"
                    label="坐标轴"
                    :options="LandUseTypeOpt"
                    :iMultiple="true"
                    :iClearable="true"
                    :iFilterable="false"
                    :defaultVal="selectVal"
                    @select="select"
                />
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import type { INewList } from '@/types/home.type'
import { getNews, getTradeVolumn } from '@/api/home'
import { reactive, ref, defineAsyncComponent } from 'vue'
import BaseEchart from '@/components/chart/BaseEchart.vue'
import { getBaseOpt } from '@/utils/echartsOptionFactory'
import BaseSelect from '@/components/filter/select/BaseSelect.vue'
import { LandUseTypeOpt } from '@/config/options.config'
// 日期范围
const dataRange = ref(['2022-10-01', '2023-03-10'])
const baseParam = { startDate: dataRange.value[0], endDate: dataRange.value[1] }

// 最新动态
const swiperComponent = defineAsyncComponent({
    loader: () => import('./components/VerticalSwiper.vue'),
    loadingComponent: Loading
})
let newsList: INewList[] = reactive([])
getNews().then(res => {
    newsList.push(...res.data)
})

const chartData = reactive({
    options: {}
})
getTradeVolumn(baseParam).then(res => {
    chartData.options = getBaseOpt(res.data)
})

let selectVal = ref<any>([0])
const select = (val: any) => {
    selectVal.value = val
}
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

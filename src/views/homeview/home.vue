<template>
    <div>
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
                        @change="changeDate"
                    />
                </div>
            </el-col>
            <el-col :span="18">
                <div class="base-box news-wrap">
                    <div class="news-pic"></div>
                    <div class="swiper-box">
                        <vertical-swiper :list="newsList" />
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="10" class="part-top-row m_t_15">
            <el-col :span="12">
                <div class="base-box">
                    <Suspense>
                        <trade-volumn :baseParam="baseParam" />
                        <template #fallback>
                            <loading />
                        </template>
                    </Suspense>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="base-box">
                    <Suspense>
                        <invisor-rank :baseParam="baseParam" />
                        <template #fallback>
                            <loading />
                        </template>
                    </Suspense>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10" class="part-bottom-row m_t_15">
            <el-col :span="24">
                <div class="base-box">
                    <Suspense>
                        <land-list :baseParam="baseParam" />
                        <template #fallback>
                            <loading />
                        </template>
                    </Suspense>
                </div>
            </el-col>
        </el-row>
        <c-button>1</c-button>
    </div>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import TradeVolumn from './components/TradeVolumn.vue'
import InvisorRank from './components/InvisorRank.vue'
import LandList from './components/LandList.vue'
import type { INewList } from '@/types/home.type'
import { getNews } from '@/api/home'
import { reactive, ref, defineAsyncComponent, computed } from 'vue'
import { keepAliveMixin } from '@/utils/keepAliveMixin'
keepAliveMixin()
// 日期范围
const dataRange = ref<string[]>(['2022-10-01', '2023-03-10'])
const changeDate = (val: string[]) => {
    dataRange.value = val
}
const baseParam = computed(() => ({ startDate: dataRange.value[0], endDate: dataRange.value[1] }))

// 最新动态
const VerticalSwiper = defineAsyncComponent({
    loader: () => import('./components/VerticalSwiper.vue'),
    loadingComponent: Loading
})
let newsList: INewList[] = reactive([])
getNews().then(res => {
    newsList.push(...res.data)
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
.el-row {
    .el-col,
    .base-box {
        height: 100%;
    }
}
.part-top-row {
    height: 416px;
}
.part-bottom-row {
    height: 640px;
}
</style>

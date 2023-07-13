<template>
    <module-head title="成交量价">
        <template #tool>
            <base-select width="150px" label="横轴" :options="timeTypeOpt" :defaultVal="selectVal" @select="select" />
        </template>
    </module-head>
    <base-echart :options="chartData.options" height="350px"></base-echart>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { getTradeVolumn } from '@/api/home'
import { getBaseOpt } from '@/utils/echartsOptionFactory'
import { timeTypeOpt } from '@/config/options.config'
import BaseEchart from '@/components/chart/BaseEchart.vue'
import ModuleHead from '@/components/ModuleHead.vue'
import BaseSelect from '@/components/filter/select/BaseSelect.vue'
import type { TimeRange } from '@/types/common.type'
const props = defineProps<{
    // 全局参数
    baseParam: TimeRange
}>()

let selectVal = ref<any>('year')
const select = (val: any) => {
    selectVal.value = val
    getData()
}

const chartData = reactive({
    options: {}
})
const getData = async () => {
    let res = await getTradeVolumn({
        ...props.baseParam,
        timeType: selectVal.value
    })
    chartData.options = getBaseOpt(res.data)
}
await getData()

watch(
    () => props.baseParam,
    () => {
        getData()
    },
    { deep: true }
)
</script>

<style lang="scss" scoped></style>

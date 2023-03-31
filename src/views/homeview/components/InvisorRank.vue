<template>
    <div>
        <module-head title="房企拿地排行">
            <template #tool>
                <base-select width="100px" :options="LandUseTypeOpt" :defaultVal="selectVal" @select="select" />
            </template>
        </module-head>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { getTradeVolumn } from '@/api/home'
import { LandUseTypeOpt } from '@/config/options.config'
import ModuleHead from '@/components/ModuleHead.vue'
import BaseSelect from '@/components/filter/select/BaseSelect.vue'
import type { TimeRange } from '@/types/common.type'
const props = defineProps<{
    // 全局参数
    baseParam: TimeRange
}>()

let selectVal = ref<any>(0)
const select = (val: any) => {
    selectVal.value = val
    getData()
}

// const chartData = reactive({
//     options: {}
// })
const getData = async () => {
    let res = await getTradeVolumn({
        ...props.baseParam,
        timeType: selectVal.value
    })
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

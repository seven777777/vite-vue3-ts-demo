<template>
    <div ref="echartDivRef" class="base-chart" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import useEchart from '@/utils/useEcharts'
import { onMounted, ref, watchEffect } from 'vue'
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
const theme = ref<string>(themeStore.themeType)
// 定义props
const props = withDefaults(
    defineProps<{
        options: EChartsOption
        width?: string
        height?: string
        mode?: string
    }>(),
    {
        width: '100%',
        height: '100%',
        mode: 'light' //'light'|'dark'
    }
)

const emits = defineEmits(['echartClick'])
const echartDivRef = ref()
onMounted(() => {
    const { setOptions, echartInstance } = useEchart(echartDivRef.value, props.mode)

    watchEffect(() => {
        setOptions(props.options)
    })

    //图表项点击
    echartInstance.on('click', param => {
        emits('echartClick', param)
    })
})
</script>

<style lang="scss" scoped>
.base-chart {
    min-height: 200px;
}
</style>

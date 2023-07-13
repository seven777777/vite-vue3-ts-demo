<template>
    <div ref="echartDivRef" class="base-chart" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import useEchart from '@/utils/useEcharts'
import { onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()

// 定义props
const props = withDefaults(
    defineProps<{
        options: EChartsOption
        width?: string
        height?: string
    }>(),
    {
        width: '100%',
        height: '100%'
    }
)

const emits = defineEmits(['echartClick'])
const echartDivRef = ref()

const onDraw = (UseEchart: any) => {
    //图表项点击
    UseEchart.echartInstance.on('click', (param: any) => {
        emits('echartClick', param)
    })
    window.addEventListener('resize', () => {
        UseEchart.updateSize()
    })
}
const onDispose = (UseEchart: any) => {
    UseEchart.echartInstance.dispose()
    UseEchart.echartInstance.onclick = null
    window.onresize = null
}

onMounted(() => {
    let myUseEchart = new useEchart(echartDivRef.value, themeStore.themeType)
    watchEffect(() => {
        myUseEchart.setOptions(props.options)
    })
    onDraw(myUseEchart)
    watch(
        () => themeStore.themeType,
        () => {
            if (myUseEchart.echartInstance) {
                onDispose(myUseEchart)
            }
            myUseEchart.theme = themeStore.themeType
            myUseEchart.echartInstance = myUseEchart.initChart()
            myUseEchart.setOptions(props.options)
            onDraw(myUseEchart)
        }
    )
})
onBeforeUnmount(() => {
    window.onresize = null
})
</script>

<style lang="scss" scoped>
.base-chart {
    min-height: 200px;
}
</style>

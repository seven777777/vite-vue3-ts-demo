import * as echarts from 'echarts'

export default function (el: HTMLElement, mode: string) {
    const echartInstance = echarts.init(el, mode)

    const setOptions = (options: echarts.EChartsOption) => {
        echartInstance.setOption(options)
    }
    const updateSize = () => {
        echartInstance.resize()
    }
    window.addEventListener('resize', () => {
        echartInstance.resize()
    })
    return {
        echartInstance,
        setOptions,
        updateSize
    }
}

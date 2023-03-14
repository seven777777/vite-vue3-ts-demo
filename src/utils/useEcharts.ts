import * as echarts from 'echarts'

class useEcharts {
    echartInstance: any
    el: HTMLElement
    theme: string
    constructor(el: HTMLElement, theme: string) {
        this.el = el
        this.theme = theme
        this.echartInstance = this.initChart()
    }
    initChart() {
        return echarts.init(this.el, this.theme)
    }
    setOptions(options: echarts.EChartsOption) {
        this.echartInstance.setOption(options)
    }
    updateSize() {
        this.echartInstance.resize()
    }
}

export default useEcharts

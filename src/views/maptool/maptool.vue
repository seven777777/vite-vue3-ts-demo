<template>
    <div class="base-box" id="base-box">
        <div id="container"></div>
        <div id="minimap" class="minimap"></div>
        <TeleportContainer />
    </div>
</template>

<script setup lang="ts">
import { Graph } from '@antv/x6'
import { getTeleport, register } from '@antv/x6-vue-shape'
import { onMounted } from 'vue'
import VueDemoNode from './components/VueDemoNode.vue'
import { MiniMap } from '@antv/x6-plugin-minimap'
import { Scroller } from '@antv/x6-plugin-scroller'

register({
    shape: 'custom-vue-node',
    width: 100,
    height: 100,
    component: VueDemoNode
})
const TeleportContainer = getTeleport()

onMounted(() => {
    const graph = new Graph({
        container: document.getElementById('container') as HTMLElement,
        width: document.getElementById('base-box')?.clientWidth,
        height: document.getElementById('base-box')?.clientHeight,
        // autoResize: true,
        // panning: true,
        mousewheel: true,
        background: {
            color: '#F2F7Fa'
        },
        grid: {
            visible: true,
            type: 'doubleMesh',
            args: [
                {
                    color: '#eee', // 主网格线颜色
                    thickness: 1 // 主网格线宽度
                },
                {
                    color: '#ddd', // 次网格线颜色
                    thickness: 1, // 次网格线宽度
                    factor: 4 // 主次网格线间隔
                }
            ]
        }
    })
    graph.addNode({
        shape: 'custom-vue-node',
        x: 60,
        y: 100
    })
    graph.addNode({
        shape: 'custom-vue-node',
        x: 160,
        y: 100
    })
    graph.use(
        new Scroller({
            enabled: true,
            // pageVisible: true,
            pageBreak: true,
            pannable: true
        })
    )
    graph.use(
        new MiniMap({
            container: document.getElementById('minimap') as HTMLElement,
            width: 200,
            height: 160,
            padding: 10
        })
    )
    graph.centerContent()
})
</script>

<style lang="scss" scoped>
.base-box {
    width: 100%;
    height: 100%;
}
.minimap {
    position: absolute;
    right: 0;
    bottom: 0;
}
</style>

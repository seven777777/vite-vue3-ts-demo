<template>
    <el-progress type="dashboard" :percentage="percentage" :width="80">
        <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span>
        </template>
    </el-progress>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'

const percentage = ref(80)
const getNode = inject('getNode')
onMounted(() => {
    // const node = getNode()
    // console.log(node)
})
</script>

<style lang="scss" scoped>
.box {
    height: 100px;
    background-color: #fff;
    border-radius: 4px;
    padding: 10px;
}
</style>

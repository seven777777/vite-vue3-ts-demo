<template>
    <el-input
        v-model="searchKey"
        class="head-search"
        size="large"
        :placeholder="`${$t('qingShuRuTuDiMingChengBianHaoTuDiDiZhiBanKuaiMingChengHuoQiYeMingCheng')}`"
        :prefix-icon="Search"
    >
        <template #suffix>
            <el-button class="search-btn" @click="search">{{ $t('souYiXia') }}</el-button>
        </template>
    </el-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const searchKey = ref('')
const search = () => {
    console.log(searchKey.value, 'ee12')
}
</script>

<style lang="scss" scoped>
.head-search {
    width: 480px;
    font-size: 12px;
    :deep(.el-input__wrapper) {
        padding-right: 4px;
    }
}
.search-btn {
    width: 90px;
    height: 30px;
    border-radius: 4px;
    border: none;
    background: linear-gradient(126deg, #007eff, #0dc7f7);
    color: white;
    font-size: 14px;
    :deep(span) {
        font-weight: bold;
    }
}
</style>

<template>
    <div class="loading-wrap">
        <template v-if="type == 'text'">{{ $t('jiaZaiZhong') }}。。。</template>
        <template v-else>
            <el-icon class="circular"><Loading /></el-icon>
        </template>
    </div>
</template>

<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue'
const props = withDefaults(
    defineProps<{
        type?: 'text' | 'gif'
    }>(),
    {
        type: 'gif'
    }
)
</script>

<style lang="scss" scoped>
.loading-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($color: #b9c4d6, $alpha: 0.1);
}
.circular {
    animation: loding-anm 2s linear infinite;
}
@keyframes loding-anm {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>

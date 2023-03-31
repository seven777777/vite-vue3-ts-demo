<template>
    <div class="module-head">
        <div>
            <div class="head-title" v-if="title">{{ title }}</div>
        </div>
        <div class="flex_ai_c">
            <slot name="tool"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title?: string
}>()
</script>

<style lang="scss" scoped>
.module-head {
    height: 52px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.head-title {
    padding-left: 12px;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    flex-shrink: 0;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        width: 2px;
        height: 14px;
        background-color: $color-primary;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>

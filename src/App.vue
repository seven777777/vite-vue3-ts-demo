<template>
    <RouterView />
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

// 初始化主题配置
const themeStore = useThemeStore()
themeStore.setTheme(themeStore.themeType)
</script>

<style lang="scss" scoped></style>

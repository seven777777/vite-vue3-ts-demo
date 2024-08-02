<template>
    <el-config-provider :locale="showLocale">
        <RouterView />
    </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { showLocale } from '@/lang/elLocale'
</script>

<style lang="scss" scoped></style>

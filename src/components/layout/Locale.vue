<template>
    <el-dropdown @command="handleCommand">
        <i :class="['iconfont', 'icon-shengchengditu']"></i>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item
                    :class="{ active: showLocale == item.name }"
                    v-for="(item, index) in localeList"
                    :key="index"
                    :command="item"
                >
                    {{ item.name }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { localeList } from '@/lang/config'
import type { LocaleItem } from '@/lang/config'
import { useLocaleStore } from '@/stores/locale'
import { computed } from 'vue'

const localStore = useLocaleStore()

const showLocale = computed(() => {
    return localeList.find(e => e.code == localStore.localeInfo)?.name || 'Lang'
})

const handleCommand = (command: LocaleItem) => {
    localStore.changeLocaleInfo(command.code)
    location.reload()
}
</script>

<style lang="scss" scoped>
:deep(.el-dropdown-menu__item) {
    &.active {
        color: $color-primary;
    }
}
</style>

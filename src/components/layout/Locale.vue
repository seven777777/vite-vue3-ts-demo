<template>
    <el-dropdown @command="handleCommand">
        <i :class="['iconfont', 'icon-shengchengditu']"></i>
        <template #dropdown>
            <el-dropdown-menu>
                <!-- <el-dropdown-item v-for="(item, index) in langList" :key="index" :command="item">
                    {{ item.name }}
                </el-dropdown-item> -->
                <el-dropdown-item>English</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
// import langList, { LangItem } from '@/lang/config.ts'
// import { useLocaleStore } from '@/store/locale'
// import { computed } from 'vue'

// const localStore = useLocaleStore()

// const showLocale = computed(() => {
//     return langList.find(e => e.code == localStore.localeInfo)?.name || 'Lang'
// })

const handleCommand = (command: LangItem) => {
    //     localStore.changeLocaleInfo(command.code)
    //     location.reload()
}
</script>

<style lang="scss" scoped></style>

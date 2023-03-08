<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { changeTheme, DEFAULT_THEME_LIST } from '@/utils/theme'
import ThemeConfig from '@/config/theme.config'
const themeList = reactive(DEFAULT_THEME_LIST)
const saveThemeMode = ref<string | null>('')
onMounted(() => {
    saveThemeMode.value = localStorage.getItem('kThemeMode')
    if (saveThemeMode.value) {
        changeTheme(saveThemeMode.value)
    }
    const selectDom = document.getElementById('theme-select') as HTMLSelectElement
    selectDom.onchange = function () {
        changeTheme(selectDom.value)
        console.log(ThemeConfig[selectDom.value])
    }
})
</script>

<template>
    <div class="page_container">
        <p class="test">12</p>
        <div class="topic">Vue Theme Change</div>
        <div>
            <label for="theme-select">Current Theme:</label>
            <select name="themes" id="theme-select">
                <option v-for="(item, index) in themeList" :key="index" :value="item" :selected="item == saveThemeMode">
                    {{ item }}
                </option>
            </select>
        </div>
    </div>
    <!-- <RouterView /> -->
</template>

<style scoped lang="scss">
.topic {
    font-size: larger;
    color: var(--color-heading);
}
.test {
    color: black;
}
body[theme-mode='dark'] {
    .test {
        color: white;
    }
}
</style>

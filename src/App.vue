<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { changeTheme, DEFAULT_THEME_LIST } from '@/utils/theme'
import ThemeConfig from '@/config/theme.config'
import { getLoginInfo } from '@/api/common'
const themeList = reactive(DEFAULT_THEME_LIST)
const saveThemeMode = ref<string | null>('')

import { Edit, Female } from '@element-plus/icons-vue'

interface LinkItem {
    value: string
    link: string
}

const state = ref('')
const links = ref<LinkItem[]>([])

const querySearch = (queryString: string, cb) => {
    const results = queryString ? links.value.filter(createFilter(queryString)) : links.value
    // call callback function to return suggestion objects
    cb(results)
}
const createFilter = queryString => {
    return restaurant => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    }
}
const loadAll = () => {
    return [
        { value: 'vue', link: 'https://github.com/vuejs/vue' },
        { value: 'element', link: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', link: 'https://github.com/babel/babel' }
    ]
}
const handleSelect = (item: LinkItem) => {
    console.log(item)
}

const handleIconClick = (ev: Event) => {
    console.log(ev)
}

onMounted(() => {
    links.value = loadAll()
})
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
    getLoginInfo().then(res => {
        console.log(res)
    })
})
</script>

<template>
    <div class="page_container">
        <p class="test">12</p>
        <el-button type="primary" disabled>Primary</el-button>
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
    <el-icon><Female /></el-icon>
    <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearch"
        popper-class="my-autocomplete"
        placeholder="Please input"
        @select="handleSelect"
    >
        <template #suffix>
            <el-icon @click="handleIconClick">
                <edit />
            </el-icon>
        </template>
        <template #default="{ item }">
            <div class="value">{{ item.value }}</div>
            <span class="link">{{ item.link }}</span>
        </template>
    </el-autocomplete>
    <!-- <RouterView /> -->
</template>

<style scoped lang="scss">
.topic {
    font-size: larger;
    color: var(--color-heading);
}
.test {
    color: black;
    @include text-ellipsis;
}
body[theme-mode='dark'] {
    .test {
        color: white;
    }
}

.my-autocomplete li {
    line-height: normal;
    padding: 7px;
}
.my-autocomplete li .name {
    text-overflow: ellipsis;
    overflow: hidden;
}
.my-autocomplete li .addr {
    font-size: 12px;
    color: #b4b4b4;
}
.my-autocomplete li .highlighted .addr {
    color: #ddd;
}
</style>

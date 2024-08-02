<template>
    <div class="side-bar">
        <div class="logo-box">
            <div class="logo"></div>
        </div>
        <ul class="nav-list">
            <router-link
                :class="['list-item', { active: item.curMenu == curPageName }]"
                v-for="(item, index) in navList"
                :key="index"
                :to="item.path"
            >
                <i :class="['iconfont', item.icon]"></i>
                {{ item.title }}
            </router-link>
        </ul>
        <el-switch
            class="theme-switch"
            v-model="themeStore.themeType"
            @change="themeStore.setTheme(themeStore.themeType)"
            inline-prompt
            active-value="dark"
            inactive-value="light"
            :active-icon="Moon"
            :inactive-icon="Sunny"
        />
    </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { ref, watchEffect } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

// 主题配置Store
const themeStore = useThemeStore()
// 初始化主题
themeStore.setTheme(themeStore.themeType)

// 导航列表
interface INavItem {
    title: string
    icon: string
    curMenu: string
    path: string
}
const navList: INavItem[] = [
    { title: '顾问首页', icon: 'icon-shouye1', curMenu: 'home', path: '/home' },
    { title: '地块搜索', icon: 'icon-dikuaisousuo1', curMenu: 'landsearch', path: '/landsearch' },
    { title: '地图工具', icon: 'icon-ditu', curMenu: 'maptool', path: '/maptool' },
    { title: '测试模块', icon: 'icon-ditugongju', curMenu: 'test', path: '/test' }
]
let curPageName = ref<string>('')
let route = useRoute()
// 监听路由动态修改导航高亮item
watchEffect(() => {
    curPageName.value = route.meta.curPageName as string
})
</script>

<style lang="scss" scoped>
.side-bar {
    width: 100%;
    height: 100%;
    max-width: 300px;
    background: var(--bg-color-sidebar);
    position: relative;
    .logo-box {
        height: 80px;
        background: repeating-linear-gradient(110deg, #ecf6ff, #ecf6ff 5px, #ffffff 0, #ffffff 12px);
        position: relative;
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0) 30%, #ffffff 80%);
        }
        .logo {
            width: 100%;
            height: 100%;
            @include abs-bg('logo-light.png');
            position: relative;
            z-index: 1000;
        }
    }
    .nav-list {
        margin-top: 30px;
        .list-item {
            height: 48px;
            font-size: 15px;
            padding: 0 10px 0 25px;
            color: var(--text-color-regular);
            display: flex;
            align-items: center;
            cursor: pointer;
            .iconfont {
                margin-right: 10px;
            }

            &.active {
                background: linear-gradient(270deg, rgba(1, 133, 254, 0.1) 0%, rgba(0, 126, 255, 0) 100%);
                border-right: 2px solid $color-primary;
                font-weight: bold;
                color: var(--text-color-highlight);
                .iconfont {
                    color: $color-primary;
                }
            }
        }
    }
    .theme-switch {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
    }
}
#{themeWrap('dark')} {
    .logo-box {
        background: repeating-linear-gradient(
            110deg,
            rgba(42, 171, 255, 0.1),
            rgba(42, 171, 255, 0.1) 5px,
            rgba(0, 38, 102, 0) 0,
            rgba(0, 38, 102, 0) 12px
        );
        &::after {
            background: linear-gradient(135deg, #1e2450 30%, #14193a 80%);
        }
        .logo {
            @include abs-bg('logo-deep.png');
        }
    }
}
</style>

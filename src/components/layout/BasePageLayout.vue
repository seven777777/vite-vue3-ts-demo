<template>
    <div class="base-page-layout">
        <div class="layout-side-bar">
            <side-bar />
        </div>
        <div class="layout-main">
            <div class="layout-head">
                <head-bar />
            </div>
            <div class="layout-content">
                <router-view v-slot="{ Component }">
                    <transition name="slide-fade" mode="out-in">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue'
import HeadBar from '@/components/layout/HeadBar.vue'
</script>

<style lang="scss" scoped>
.base-page-layout {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    display: flex;
    background-color: var(--bg-color-page);
}
.layout-side-bar {
    flex-shrink: 0;
    width: 160px;
    box-shadow: var(--box-shadow);
    position: relative;
    z-index: 1000;
}
.layout-main {
    width: calc(100% - 160px);
    min-width: 1100px;
    .layout-head {
        height: 60px;
        padding: 0 20px;
    }
    .layout-content {
        width: 100%;
        height: calc(100vh - 60px);
        padding: 0 20px 20px 20px;
        overflow: auto;
        position: relative;
    }
}
.slide-fade-enter-active {
    transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>

<template>
    <div class="head-bar">
        <head-search />
        <div class="flex_c">
            <div class="head-nav-item"><a href="/">CRIC首页</a></div>
            <div class="head-nav-item"><a href="#">操作指南</a></div>
            <div class="head-nav-item"><a href="#">数据说明</a></div>
            <div class="head-nav-item">
                <locale />
            </div>

            <div class="head-nav-item">
                <el-dropdown trigger="click">
                    <span class="flex_c cursor_p">
                        Seven
                        <i class="iconfont icon-xiala m_l_5"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>登出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeadSearch from '@/components/filter/HeadSearch.vue'
import Locale from './Locale.vue'
</script>

<style lang="scss" scoped>
.head-bar {
    width: 100%;
    height: 100%;
    max-height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .head-nav-item {
        color: var(--text-color);
        padding: 0 20px;
        display: flex;
        align-items: center;
        &::after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 16px;
            background-color: var(--line-color);
        }
        &:last-child {
            &::after {
                width: 0;
            }
        }
    }
}
</style>

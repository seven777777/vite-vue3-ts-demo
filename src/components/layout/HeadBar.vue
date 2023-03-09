<template>
    <div class="head-bar">
        <div>search</div>
        <div class="flex_c">
            <div class="head-nav-item"><a class="link" href="#">CRIC首页</a></div>
            <div class="head-nav-item">CRIC首页</div>
            <div class="head-nav-item">CRIC首页</div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

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

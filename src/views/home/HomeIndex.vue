<template>
    <el-row :gutter="10" class="home-header">
        <el-col :span="6">
            <div class="base-box">
                <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始"
                    end-placeholder="结束"
                    value-format="YYYY-MM-DD"
                    :unlink-panels="true"
                    placement="bottom-start"
                    :clearable="false"
                />
            </div>
        </el-col>
        <el-col :span="18">
            <div class="base-box news-wrap">
                <div class="news-pic"></div>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(['2022-10-01', '2023-03-10'])
</script>

<style lang="scss" scoped>
.home-header {
    height: 42px;
    .base-box {
        height: 100%;
        :deep(.el-range-editor--small.el-input__wrapper) {
            width: 100%;
            height: 100%;
            box-shadow: none;
        }
    }
}
.news-wrap {
    display: flex;
    align-items: center;
    padding: 0 8px 0 16px;
}
.news-pic {
    width: 75px;
    height: 15px;
    @include abs-bg('news-light.png');
}
#{themeWrap('dark')} {
    .news-pic {
        @include abs-bg('news-deep.png');
    }
}
</style>

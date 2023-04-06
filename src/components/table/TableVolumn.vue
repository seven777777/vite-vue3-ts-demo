<template>
    <el-table-column
        :prop="headColumn.prop"
        :align="headColumn.align || 'left'"
        :width="headColumn.width || ''"
        :fixed="!headColumn.children && headColumn.isFixed ? headColumn.isFixed : false"
        :show-overflow-tooltip="headColumn.noDefaultTooltip ? false : true"
        :min-width="
            headColumn.minWidth
                ? headColumn.minWidth
                : !headColumn.children && headColumn.label.length * 15 + 20 > defaultMinWidth
                ? headColumn.label.length * 15 + 20
                : defaultMinWidth
        "
        :sortable="headColumn.isSort ? 'custom' : false"
        :label="headColumn.label + (headColumn.hUnit ? '(' + headColumn.hUnit + ')' : '')"
        :class-name="headColumn.columnClass || ''"
    >
        <template #default="scope">
            <!-- 多维表头遍历 -->
            <template v-if="headColumn.children && headColumn.children.length">
                <table-volumn
                    v-for="(columnData, index) in headColumn.children"
                    :key="index"
                    :headColumn="columnData"
                />
            </template>
            <!-- 工具栏layout -->
            <div
                :class="[
                    headColumn.align == 'center'
                        ? 'flex_center'
                        : headColumn.align == 'right'
                        ? 'flex_end'
                        : 'flex_align'
                ]"
                v-else-if="headColumn.isTool"
            >
                <template v-if="scope.row.sCateDesc !== '汇总'">
                    <el-tooltip
                        v-for="(item, index) in headColumn.toolConfig"
                        :content="item.tipTxt(scope.row)"
                        :key="index"
                        effect="dark"
                        placement="bottom"
                    >
                        <div
                            :class="['base-tool-btn', index == 0 ? '' : 'm_l10', item.status(scope.row)]"
                            @click="item.clickFunc(scope.row)"
                        >
                            <i :class="['iconfont', item.icon]"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template v-else>-</template>
            </div>
            <!-- 排行榜 -->
            <div v-else-if="headColumn.isRank" class="svg-box">
                <svg class="icon svg-icon" aria-hidden="true" v-if="scope.row[headColumn.prop] < 3">
                    <use :xlink:href="`#icon-paihangbang-${scope.row[headColumn.prop] + 1}`" />
                </svg>
                <span v-else>{{ scope.row[headColumn.prop] + 1 }}</span>
            </div>
            <!-- 基本layout -->
            <span
                v-else
                :class="{ isLink: headColumn.isLink }"
                @click="headColumn.isLink && linkSpanClick(scope, headColumn)"
            >
                {{ scope.row[headColumn.prop] }}
                <template v-if="headColumn.cUnit">{{ headColumn.cUnit }}</template>
            </span>
        </template>
    </el-table-column>
</template>

<script setup lang="ts">
import type { TableHead } from '@/types/common.type'
const props = withDefaults(
    defineProps<{
        headColumn: TableHead
        defaultMinWidth?: number
    }>(),
    {
        defaultMinWidth: 110
    }
)
// 可点击单元格元素点击事件
const linkSpanClick = (scope: any, headColumn: TableHead) => {
    if (headColumn.isLink) {
        if (headColumn.linkFunc) {
            headColumn.linkFunc(scope)
        }
    }
}
</script>

<style lang="scss" scoped>
.svg-box {
    display: flex;
    justify-content: center;
    align-items: center;

    .svg-icon {
        width: 18px;
        height: 18px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
}
</style>

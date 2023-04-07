<template>
    <el-table
        class="base-table"
        ref="myTable"
        :border="iBorder"
        :key="keyNum"
        :height="height"
        :max-height="maxHeight"
        :row-class-name="rowClassSet"
        :cell-class-name="realCellClassSet"
        :header-cell-class-name="realHeadCellClassSet"
        :default-sort="defaultSort"
        :stripe="iStripe"
        @sort-change="sortChange"
        :data="tableData"
    >
        <table-volumn v-for="(columnData, index) in tableHead" :key="index" :headColumn="columnData" />
    </el-table>
</template>

<script setup lang="ts">
import TableVolumn from './TableVolumn.vue'
import type {
    TableHead,
    TableData,
    TableSort,
    TableCbRowConfig,
    TableCbConfig,
    TableSortCbConfig
} from '@/types/common.type'
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(
    defineProps<{
        iBorder?: boolean //是否带边框
        iStripe?: boolean //是否有斑马纹
        height?: number | string
        maxHeight?: number | string
        defaultSort?: TableSort
        rowClassSet?: (config: TableCbRowConfig) => string
        cellClassSet?: (config: TableCbConfig) => string // 单元格样式设置
        headCellClassSet?: (config: TableCbConfig) => string // 表头单元格样式设置
        iRefresh?: boolean
        tableHead: TableHead[]
        tableData: TableData[]
    }>(),
    {
        iBorder: true,
        iStripe: true,
        height: 'auto',
        maxHeight: 'auto',
        iRefresh: false,
        iPagination: false
    }
)

let keyNum = ref<number>(1)
let myTable = ref()
onMounted(() => {
    watch(
        () => [props.tableHead, props.tableData],
        () => {
            if (props.iRefresh) {
                keyNum.value++
                myTable.value.doLayout()
            }
        },
        { deep: true }
    )
})
// 表头单元格class定制
const realHeadCellClassSet = ({ row, column, rowIndex, columnIndex }: TableCbConfig) => {
    let cellClass = ''
    const realHead = getRealHead(props.tableHead)
    if (realHead[columnIndex].isSort && props.defaultSort?.prop == realHead[columnIndex].prop) {
        cellClass += 'sortCellBg '
    }
    cellClass += props.headCellClassSet && props.headCellClassSet({ row, column, rowIndex, columnIndex })
    return cellClass
}
// 单元格class定制
const realCellClassSet = ({ row, column, rowIndex, columnIndex }: TableCbConfig) => {
    let cellClass = ''
    const realHead = getRealHead(props.tableHead)
    if (realHead[columnIndex].isLink) {
        cellClass += 'isLink '
    }
    if (realHead[columnIndex].isSort) {
        cellClass += 'sortCell '
    }
    if (realHead[columnIndex].isSort && props.defaultSort?.prop == realHead[columnIndex].prop) {
        cellClass += 'sortCellBg '
    }
    cellClass += props.cellClassSet && props.cellClassSet({ row, column, rowIndex, columnIndex })
    return cellClass
}
const getRealHead = (data: TableHead[]): TableHead[] => {
    let result: TableHead[] = []
    data.forEach((e: TableHead) => {
        if (e.children && e.children.length) {
            result = [...result, ...getRealHead(e.children)]
        } else {
            result.push(e)
        }
    })
    return result
}
const emits = defineEmits(['sortChange'])
// 排序相关
const sortChange = (obj: TableSortCbConfig) => {
    emits('sortChange', obj)
}
</script>

<style lang="scss" scoped>
:deep(.sortCellBg) {
    position: relative;
    &::before {
        content: '';
        position: absolute;
        background-color: var(--table-sort-bg);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .cell {
        position: relative;
        z-index: 10;
    }
}
:deep(.sortCell) {
    .cell {
        padding-right: 20px;
    }
}
</style>

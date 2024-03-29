<template>
    <module-head title="地块列表">
        <template #tool>
            <base-select
                width="100px"
                placeholder="地块类型"
                :iMultiple="true"
                :options="landTypeOpt"
                :defaultVal="landListParam.landType"
                @select="val => select(val, 'landType')"
            />
        </template>
    </module-head>
    <div class="base-box-padding m_b_10">
        <base-table
            :height="530"
            :iBorder="true"
            :defaultSort="tableSort"
            :tableHead="tableObj.tableHead"
            :tableData="tableObj.tableData"
            @sortChange="sortChange"
        />
        <el-pagination
            class="pagination-box"
            v-model:current-page="currentPage"
            layout="total,prev,pager,next"
            hide-on-single-page
            :total="1000"
            :page-size="10"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { getLandList } from '@/api/home'
import { landTypeOpt } from '@/config/options.config'
import ModuleHead from '@/components/ModuleHead.vue'
import BaseSelect from '@/components/filter/select/BaseSelect.vue'
import BaseTable from '@/components/table/BaseTable.vue'
import type { TimeRange, TableHead, TableSort, TableData, TableSortCbConfig } from '@/types/common.type'
import type { LandListParam } from '@/types/home.type'
const props = defineProps<{
    // 全局参数
    baseParam: TimeRange
}>()

let landListParam = reactive<LandListParam>({
    landType: [],
    page: 1,
    sOrderField: 'DocumentIssueDate'
})
const select = (val: any, key: string) => {
    landListParam[key] = val
    getData()
}

const tableObj = reactive<{ tableHead: TableHead[]; tableData: TableData[] }>({
    tableHead: [
        { prop: 'LandCaption', label: '土地名称', isLink: true, width: '120', isFixed: 'left' },
        { prop: 'Address', label: '土地地址', minWidth: '120' },
        { prop: 'CityCaption', label: '城市', minWidth: '120' },
        { prop: 'Region', label: '区域', minWidth: '120' },
        { prop: 'Area', label: '板块', minWidth: '120' },
        { prop: 'OccupyArea', label: '用地面积', minWidth: '120', align: 'right', isSort: true },
        { prop: 'TotalBuildArea', label: '总建面积', minWidth: '120', align: 'right', isSort: true },
        { prop: 'MoneySave', label: '竞买保证金', minWidth: '120', align: 'right', isSort: true },
        { prop: 'UseTypeTag', label: '土地属性', minWidth: '120' },
        { prop: 'DocumentIssueDate', label: '公告日期', minWidth: '120', isSort: true },
        { prop: 'LandTradeState', label: '交易现状', minWidth: '120' },
        { prop: 'ChangeMethod', label: '出让方式', minWidth: '120' },
        { prop: 'LandState', label: '土地现状', width: '100' },
        {
            prop: '',
            label: '操作',
            width: '100',
            isTool: true,
            align: 'center',
            isFixed: 'right',
            toolConfig: [
                {
                    icon: 'icon-shoucang2',
                    tipTxt(row) {
                        return row.sCollectSta ? '取消收藏' : '添加收藏'
                    },
                    status(row) {
                        return row.sCollectSta ? 'highlight' : ''
                    },
                    clickFunc(row) {
                        // _this.collect(row.iAutoID, row.sCollectSta ? 2 : 1, row)
                        console.log(row)
                    }
                }
            ]
        }
    ],
    tableData: []
})
const getData = async () => {
    let res = await getLandList({
        ...props.baseParam,
        ...landListParam
    })
    tableObj.tableData = res.data
}
await getData()

watch(
    () => props.baseParam,
    () => {
        getData()
    },
    { deep: true }
)

const currentPage = ref<number>(4)
const handleCurrentChange = (val: number) => {
    landListParam.page = val
    getData()
}

let tableSort = reactive<TableSort>({
    prop: landListParam.sOrderField,
    order: 'ascending'
})
const sortChange = (obj: TableSortCbConfig) => {
    tableSort.prop = landListParam.sOrderField = obj.prop
    tableSort.order = obj.order
    getData()
}
</script>

<style lang="scss" scoped></style>

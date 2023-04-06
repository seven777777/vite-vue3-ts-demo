<template>
    <module-head title="房企拿地排行">
        <template #tool>
            <base-select
                width="100px"
                :options="LandUseTypeOpt"
                :defaultVal="invisorParam.useType"
                @select="val => select(val, 'useType')"
            />
            <base-select
                width="85px"
                class="m_l_5"
                :options="limitOpt"
                :defaultVal="invisorParam.limit"
                @select="val => select(val, 'limit')"
            />
        </template>
    </module-head>
    <div class="base-box-padding">
        <base-table :height="340" :iBorder="false" :tableHead="tableObj.tableHead" :tableData="tableObj.tableData" />
    </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { getInvisorRank } from '@/api/home'
import { LandUseTypeOpt, limitOpt } from '@/config/options.config'
import ModuleHead from '@/components/ModuleHead.vue'
import BaseSelect from '@/components/filter/select/BaseSelect.vue'
import BaseTable from '@/components/table/BaseTable.vue'
import type { TimeRange, TableHead, TableData } from '@/types/common.type'
import type { InvisorRankRequest } from '@/types/home.type'
const props = defineProps<{
    // 全局参数
    baseParam: TimeRange
}>()

let invisorParam = reactive<InvisorRankRequest>({
    useType: '纯住宅',
    limit: 10
})
const select = (val: any, key: string) => {
    invisorParam[key] = val
    getData()
}
const tableObj = reactive<{ tableHead: TableHead[]; tableData: TableData[] }>({
    tableHead: [
        {
            prop: 'sort',
            label: '排名',
            align: 'center',
            isRank: true,
            width: '58'
        },
        {
            prop: 'invisor',
            label: '房企名称',
            align: 'left',
            minWidth: '180'
        },
        {
            prop: 'value',
            label: '幅数',
            hUnit: '幅',
            align: 'right',
            width: '160'
        }
    ],
    tableData: []
})
const getData = async () => {
    let res = await getInvisorRank({
        ...props.baseParam,
        ...invisorParam
    })
    tableObj.tableData = res.data.map((e, i) => {
        return {
            ...e,
            sort: i
        }
    })
}
await getData()

watch(
    () => props.baseParam,
    () => {
        getData()
    },
    { deep: true }
)
</script>

<style lang="scss" scoped></style>

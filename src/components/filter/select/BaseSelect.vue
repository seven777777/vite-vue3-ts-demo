<template>
    <div
        :class="['select-wrap', { 'select-with-label': label }]"
        :style="{ width: width, '--select-range-left': label?.length * 14 + 20 + 'px' }"
    >
        <el-select
            v-model="selected"
            class="m-2"
            :placeholder="placeholder"
            :size="size"
            :multiple="iMultiple"
            :clearable="iClearable"
            :filterable="iFilterable"
            collapse-tags
            collapse-tags-tooltip
            @change="change"
        >
            <template #prefix>
                <div class="select-label" v-if="label">{{ label }}</div>
            </template>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { ISelectOptionItem } from '@/types/common.type'

interface IwrapProp {
    size?: 'small' | 'large' | 'default'
    width?: string
    label?: string
    placeholder?: string
    iMultiple?: boolean //是否多选
    iClearable?: boolean //是否可清空
    iFilterable?: boolean //是否可筛选
    options: ISelectOptionItem[]
    defaultVal?: any //默认值
}
const props = withDefaults(defineProps<IwrapProp>(), {
    size: 'default',
    placeholder: '请选择'
})

const selected = ref<any>()
watchEffect(() => {
    selected.value = props.defaultVal
})

// 选择回调
const emits = defineEmits(['select'])
const change = (value: any) => {
    let labelSelect
    if (props.iMultiple) {
        labelSelect = value ? props.options.filter(e => value.indexOf(e.value) != -1)?.map(e => e.label) : value
    } else {
        labelSelect = value ? props.options.find(e => e.value == value)?.label : value
    }
    emits('select', value, labelSelect)
}
</script>

<style lang="scss" scoped>
.select-wrap {
    :deep(.el-select) {
        width: 100%;
        .el-select-tags-wrapper {
            display: flex;
            align-items: center;
        }
    }
}
.select-with-label {
    :deep(.el-select__tags) {
        left: var(--select-range-left);
    }
}
.select-label {
    padding-right: 10px;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 14px;
        background-color: var(--border-color);
    }
}
</style>

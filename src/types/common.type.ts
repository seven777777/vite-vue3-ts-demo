// select option
export interface ISelectOptionItem {
    label: string
    value: string | number
}
export type singleSelectVal = string | number | ISelectOptionItem
export type doubleSelectVal = string[] | number[] | ISelectOptionItem[]
export type SelectVal = singleSelectVal & doubleSelectVal

// 时间范围
export interface TimeRange {
    startDate: string
    endDate: string
}
/**
 * 表格相关
 */
// 表头对象
export interface TableHead {
    prop: string // 对应tableData的相应key值
    label: string // 表头名称
    align?: 'left' | 'right' | 'center' //对齐方式
    width?: number | string //宽度
    minWidth?: number | string //最小宽度
    hUnit?: string // 头部增加单位
    cUnit?: string //数据增加单位
    isFixed?: 'left' | 'right' // 是否滚动时固定（默认：left，选填：left | right | 不传）
    isRank?: boolean // 是否为排行榜
    isSort?: boolean // 是否为排序
    noDefaultTooltip?: boolean //是否不显示默认tooltip
    columnClass?: string
    isLink?: boolean // 是否为link，与下面linkFunc配套使用(选填：true | 不传)
    linkFunc?: (scope: any) => void // link点击回调函数
    isTool?: boolean // 是否为工具操作栏，与toolConfig配套使用(选填：true | 不传)
    toolConfig?: {
        icon: string
        tipTxt: (row: TableData) => string //说明文案回调
        status: (row: TableData) => string //按钮状态回调
        clickFunc: (row: TableData) => void //点击事件回调
    }[] // 工具栏配置
    children?: TableHead[]
}
// 表格数据
export interface TableData {
    [key: string]: any
}
export interface TableCbRowConfig {
    row: TableData
    rowIndex: number
}
export interface TableCbColumnConfig {
    column: TableData
    columnIndex: number
}
export interface TableCbConfig extends TableCbRowConfig, TableCbColumnConfig {}
export interface TableSort {
    prop: string
    order: 'ascending' | 'descending' | null
}
export interface TableSortCbConfig extends TableSort {
    column: TableHead
}

// select option
export interface ISelectOptionItem<T = string> {
    label: string
    value: T
}
export type singleSelectVal = string | number | ISelectOptionItem
export type doubleSelectVal = string[] | number[] | ISelectOptionItem[]
export type SelectVal = singleSelectVal & doubleSelectVal

import zhCN from './zh-CN'
import zhTW from './zh-TW'
import en from './en'

export type LocaleType = 'zh-CN' | 'zh-TW' | 'en'

export enum LocaleName {
    'zh-CN' = '中文(简体)',
    'zh-TW' = '中文(繁體)',
    'en' = 'English'
}

export interface LocaleItem {
    code: LocaleType
    name: string
    local: object
}

export const localeList: LocaleItem[] = [
    {
        code: 'zh-CN',
        name: LocaleName['zh-CN'],
        local: zhCN
    },
    {
        code: 'zh-TW',
        name: LocaleName['zh-TW'],
        local: zhTW
    },
    {
        code: 'en',
        name: LocaleName['en'],
        local: en
    }
]

export const localMessage = localeList.reduce((pre: any, cur: LocaleItem) => {
    pre[cur.code] = cur.local
    return pre
}, {})

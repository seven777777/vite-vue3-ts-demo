import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { computed } from 'vue'
import { useLocaleStore } from '@/stores/locale'

export const showLocale = computed(() => {
    const { localeInfo } = useLocaleStore()
    const map: { [key: string]: any } = {
        'zh-CN': zhCn,
        'zh-TW': zhTw,
        en: en
    }
    return map[localeInfo]
})

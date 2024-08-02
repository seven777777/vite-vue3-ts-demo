import { createI18n } from 'vue-i18n'
import { localMessage } from './config'

const i18n = createI18n({
    locale: 'zh-TW',
    legacy: false,
    globalInjection: true,
    messages: localMessage
})

export default i18n

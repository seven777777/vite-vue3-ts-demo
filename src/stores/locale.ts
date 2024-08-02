import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLocaleStore = defineStore(
    'locale',
    () => {
        const { locale } = useI18n()
        const localeInfo = ref(locale.value)

        function changeLocaleInfo(value: string) {
            localeInfo.value = locale.value = value
        }

        const localeInit = localStorage.getItem('locale')
        if (localeInit) {
            const { localeInfo = '' } = JSON.parse(localeInit)
            if (localeInfo) {
                changeLocaleInfo(localeInfo)
            }
        }

        return { localeInfo, changeLocaleInfo }
    },
    { persist: true }
)

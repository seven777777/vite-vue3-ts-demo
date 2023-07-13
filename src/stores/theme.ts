import { defineStore } from 'pinia'
import { ThemeConfig, type IThemeConfig } from '@/config/theme.config'

export interface IThemeState {
    themeType: string
}

const THEME_MODE_ATTR = 'theme-mode'

export const useThemeStore = defineStore('theme', {
    state() {
        return {
            themeType: localStorage.getItem('kThemeMode') || 'light'
        }
    },
    getters: {
        // 当前主题的配置
        currentThemeConfig(): IThemeConfig {
            return ThemeConfig[this.themeType]
        },
        mapStyle(): string {
            return this.themeType == 'dark' ? 'amap://styles/dark' : 'amap://styles/light'
        }
    },
    actions: {
        /**
         * 切换主题
         * @param themeTag 主题标识
         */
        setTheme(themeTag: string) {
            document.body.setAttribute(THEME_MODE_ATTR, themeTag)

            const root = document.querySelector(':root') as HTMLElement
            const list = ThemeConfig[themeTag]
            for (const key in list) {
                root.style.setProperty(key, list[key])
            }

            localStorage.setItem('kThemeMode', themeTag)
            this.themeType = themeTag
        }
    }
})

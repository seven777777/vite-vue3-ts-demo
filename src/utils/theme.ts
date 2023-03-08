import ThemeConfig from '@/config/theme.config'
// body 上额外扩展的属性名
const THEME_MODE_ATTR = 'theme-mode'
// 默认内置主题
export const DEFAULT_THEME_LIST = Object.keys(ThemeConfig)

/**
 * 切换主题
 * @param themeTag 主题标识
 */
export const changeTheme = (themeTag: string = DEFAULT_THEME_LIST[0]) => {
    const lowerThemeTag = themeTag.toLocaleLowerCase()

    document.body.setAttribute(THEME_MODE_ATTR, lowerThemeTag)

    const root = document.querySelector(':root') as HTMLElement
    const list = ThemeConfig[lowerThemeTag]
    for (const key in list) {
        root.style.setProperty(key, list[key])
    }

    localStorage.setItem('kThemeMode', themeTag)
}

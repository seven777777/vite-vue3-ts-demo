import variable from '@/assets/style/variables.module.scss'

export interface IThemeConfigItem {
    [name: string]: string
}
export interface IThemeConfig {
    light: IThemeConfigItem
    dark: IThemeConfigItem
}

export const ThemeConfig: IThemeConfig = {
    light: {
        '--bg-color': variable.colorWhite,
        '--bg-color-page': '#EEF4F8',
        '--bg-color-overlay': '#F2F4F9',
        '--bg-color-sidebar': variable.colorWhite,
        '--text-color': variable.black1,
        '--text-color-regular': variable.black1,
        '--text-color-highlight': variable.colorPrimary,
        '--box-shadow': '0 2px 8px 0 rgba(108,125,166,0.16)',
        '--line-color': '#D0D3DA',
        '--border-color': '#E2EBFB',
        '--menuItem-hover-fill': '#D0D3DA',
        '--scroll-bg-color': '#F2F4F9',
        '--scroll-thumb-color': '#D9DFEE'
    },
    dark: {
        '--bg-color': '#1B1F3F',
        '--bg-color-page': '#121523',
        '--bg-color-overlay': '#25306D',
        '--bg-color-sidebar': 'linear-gradient(270deg, #262f65 0%, #1b223f 100%)',
        '--text-color': variable.colorWhite,
        '--text-color-regular': '#787B80',
        '--text-color-highlight': variable.colorWhite,
        '--box-shadow': '0 2px 8px 0 rgba(0,0,0,0.3)',
        '--line-color': '#4356A0',
        '--border-color': '#384386',
        '--menuItem-hover-fill': '#1B1F3F',
        '--scroll-bg-color': '#171B35',
        '--scroll-thumb-color': '#243070'
    }
}

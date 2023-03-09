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
        '--bg-color-sidebar': variable.colorWhite,
        '--text-color': variable.black1,
        '--text-color-regular': variable.black1,
        '--text-color-highlight': variable.colorPrimary,
        '--box-shadow': '0 2px 8px 0 rgba(108,125,166,0.16)',
        '--line-color': '#D0D3DA',
        '--border-color': '#E2EBFB'
    },
    dark: {
        '--bg-color': '#1B1F3F',
        '--bg-color-page': '#121523',
        '--bg-color-sidebar': 'linear-gradient(270deg, #262f65 0%, #1b223f 100%)',
        '--text-color': variable.colorWhite,
        '--text-color-regular': '#787B80',
        '--text-color-highlight': variable.colorWhite,
        '--box-shadow': '0 2px 8px 0 rgba(0,0,0,0.3)',
        '--line-color': '#4356A0',
        '--border-color': '#384386'
    }
}

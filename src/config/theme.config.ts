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
        '--bg-color-page': variable.fillColorLight2,
        '--bg-color-overlay': variable.colorWhite,
        '--bg-color-sidebar': variable.colorWhite,
        '--text-color': variable.black1,
        '--text-color-regular': variable.black1,
        '--text-color-highlight': variable.colorPrimary,
        '--text-color-placeholder': '#AFB9C5',
        '--box-shadow': '0 2px 8px 0 rgba(108,125,166,0.16)',
        '--line-color': '#D0D3DA',
        '--border-color': '#E2EBFB',
        '--menuItem-hover-fill': variable.fillColorLight1,
        '--scroll-bg-color': variable.fillColorLight1,
        '--scroll-thumb-color': variable.fillColorLight3,
        '--inrange-bg-color': variable.fillColorLight1,
        '--input-bg-color': variable.colorWhite,
        '--loading-bg-color': 'rgba(255, 255, 255, 0.6)'
    },
    dark: {
        '--bg-color': variable.fillColorDark3,
        '--bg-color-page': variable.fillColorDark1,
        '--bg-color-overlay': variable.fillColorDark4,
        '--bg-color-sidebar': 'linear-gradient(270deg, #262f65 0%, #1b223f 100%)',
        '--text-color': variable.colorWhite,
        '--text-color-regular': '#787B80',
        '--text-color-highlight': variable.colorWhite,
        '--text-color-placeholder': '#8898B1',
        '--box-shadow': '0 2px 8px 0 rgba(0,0,0,0.3)',
        '--line-color': '#4356A0',
        '--border-color': '#384386',
        '--menuItem-hover-fill': variable.fillColorDark3,
        '--scroll-bg-color': variable.fillColorDark2,
        '--scroll-thumb-color': variable.fillColorDark4,
        '--inrange-bg-color': variable.fillColorDark2,
        '--input-bg-color': variable.fillColorDark3,
        '--loading-bg-color': 'rgba(27, 31, 63, 0.8)'
    }
}

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
        '--text-color': variable.colorBlack1,
        '--text-color-regular': variable.colorBlack1,
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
        '--loading-bg-color': 'rgba(255, 255, 255, 0.6)',
        '--table-bg-color': variable.colorWhite,
        '--table-head-bg-color': '#F3F6FF',
        '--table-head-text': variable.colorBlack2,
        '--table-head-sort': variable.colorBlack3,
        '--table-bg-zebra': '#F6F9FD',
        '--table-border': '#E2EBFB',
        '--table-fixed-shadow': 'rgba(189, 207, 244, 0.5)',
        '--table-tips': variable.colorBlack3,
        '--table-sort-bg': 'rgba(232,243,255,0.4)',
        '--icon-color-disable': '#B9C4D6'
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
        '--loading-bg-color': 'rgba(27, 31, 63, 0.8)',
        '--table-bg-color': variable.fillColorDark3,
        '--table-head-bg-color': '#1F2858',
        '--table-head-text': '#8898B1',
        '--table-head-sort': '#8898B1',
        '--table-bg-zebra': '#1F2858',
        '--table-border': '#31385E',
        '--table-fixed-shadow': 'rgba(13, 20, 68, 0.8)',
        '--table-tips': '#8898B1',
        '--table-sort-bg': 'rgba(7, 24, 92, 0.4)',
        '--icon-color-disable': '#47566F'
    }
}

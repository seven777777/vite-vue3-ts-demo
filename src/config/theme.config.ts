import variable from '@/assets/style/variables.module.scss'

const ThemeConfig = {
    dark: {
        '--color-background': '#181818',
        '--color-text': '#ffffff'
    },
    light: {
        '--color-background': '#ffffff',
        '--color-text': variable.errorColor
    }
}

export default ThemeConfig

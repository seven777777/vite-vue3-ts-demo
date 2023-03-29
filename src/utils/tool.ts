import type { ISelectOptionItem } from '@/types/common.type'
/**
 * color=>rgba
 * @param {color} 色值
 * @param {opacity} 透明度
 *
 * 测试:
 * console.log(colorToRGBA('00B4B6',0.2)); //rgba(0,180,182,0.2)
 */
export function colorToRGBA(color: string, opacity: number): string {
    let _color: string = color
    if (color.substring(0, 1) == '#') _color = color.substring(1)
    if (_color.length == 3)
        _color = _color
            .split('')
            .map(e => '' + e + e)
            .join('')
    if (_color.length != 6) return ''

    _color = _color.toLowerCase()

    const rgb = new Array()
    for (let x = 0; x < 3; x++) {
        rgb[0] = _color.substring(x * 2, 2)
        rgb[3] = '0123456789abcdef'
        rgb[1] = rgb[0].substr(0, 1)
        rgb[2] = rgb[0].substr(1, 1)
        rgb[20 + x] = rgb[3].indexOf(rgb[1]) * 16 + rgb[3].indexOf(rgb[2])
    }
    return 'rgba(' + rgb[20] + ',' + rgb[21] + ',' + rgb[22] + ',' + opacity + ')'
}

/**
 * 枚举值转options
 * @param enumData
 * @param iLabelAsValue label和value是否相同，默认是
 * @returns
 */
export function enumToOptions(enumData: any, iLabelAsValue: boolean = true): ISelectOptionItem[] {
    return Object.keys(enumData)
        .filter(v => isNaN(Number(v)))
        .map(name => {
            return {
                label: name,
                value: iLabelAsValue ? name : enumData[name as keyof typeof enumData]
            }
        })
}

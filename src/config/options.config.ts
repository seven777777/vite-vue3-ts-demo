import { LandUseType } from '@/config/enum.config'
import { enumToOptions } from '@/utils/tool'

export const LandUseTypeOpt = enumToOptions(LandUseType, false)
export const timeTyeOpt = [
    { label: '按年', value: 'year' },
    { label: '按月', value: 'month' },
    { label: '按日', value: 'day' }
]

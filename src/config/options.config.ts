import { LandUseType } from '@/config/enum.config'
import { enumToOptions } from '@/utils/tool'

export const LandUseTypeOpt = enumToOptions(LandUseType)
export const timeTypeOpt = [
    { label: '按年', value: 'year' },
    { label: '按月', value: 'month' },
    { label: '按日', value: 'day' }
]
export const limitOpt = [
    { label: 'TOP10', value: 10 },
    { label: 'TOP20', value: 20 },
    { label: 'TOP50', value: 50 }
]
export const landTypeOpt = [
    { label: '标书地块', value: '标书地块' },
    { label: '航拍地块', value: '航拍地块' }
]

export interface AreaItem {
    sAreaOrCity: string
    sCateDesc: string
    iSort?: number
    sLng: number
    sLat: number
}
export const areaList: AreaItem[] = [
    {
        sAreaOrCity: '华东地区',
        sCateDesc: '21.39万',
        iSort: 1,
        sLng: 121.473701,
        sLat: 31.230416
    },
    {
        sAreaOrCity: '西南地区',
        sCateDesc: '12.47万',
        iSort: 2,
        sLng: 104.066541,
        sLat: 30.572269
    },
    {
        sAreaOrCity: '华中地区',
        sCateDesc: '11.83万',
        iSort: 3,
        sLng: 114.305392,
        sLat: 30.593098
    },
    {
        sAreaOrCity: '华北地区',
        sCateDesc: '8.98万',
        iSort: 4,
        sLng: 116.407526,
        sLat: 39.90403
    },
    {
        sAreaOrCity: '西北地区',
        sCateDesc: '6.47万',
        iSort: 5,
        sLng: 108.940174,
        sLat: 34.341568
    },
    {
        sAreaOrCity: '华南地区',
        sCateDesc: '4.92万',
        iSort: 6,
        sLng: 113.264434,
        sLat: 23.129162
    },
    {
        sAreaOrCity: '东北地区',
        sCateDesc: '4.61万',
        iSort: 7,
        sLng: 123.431474,
        sLat: 41.805698
    }
]

interface DataObj {
    [key: string]: any
}
export type AreaCircle = (obj: AreaCircleObj) => string
interface AreaCircleObj {
    sAreaOrCity: string
    sCateDesc: string
}
export const areaCircle: AreaCircle = obj => {
    return `<div class="mark-circle-area">
        <p>${obj.sAreaOrCity}</p>
        <p>${obj.sCateDesc}</p>
    </div>`
}

export type CityCircle = (obj: CityCircleObj) => string
interface CityCircleObj {
    sAreaOrCity: string
    sCateDesc: string
}
export const cityCircle: CityCircle = obj => {
    return `<div class="mark-circle-city">
        <div class="label">${obj.sAreaOrCity}  ${obj.sCateDesc}幅</div>
    </div>`
}

/**
 * 公共基础接口封装
 */
import request from '@/utils/request'

export const getLoginInfo = () => {
    return request({
        method: 'get',
        url: '/test'
    })
}

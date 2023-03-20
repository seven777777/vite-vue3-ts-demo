import Request from '@/server/request'
import type { RequestConfig } from '@/server/types'

export interface ResType<T> {
    data: T
    message: string
    code: number
}
interface MyRequestConfig<T> extends RequestConfig {
    data?: T
}

const Server = new Request({
    baseURL: 'http://127.0.0.1:4523/m1/2407937-0-default/', // 基础路径
    timeout: 120000,
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => {
            console.log('实例请求拦截')
            return config
        },
        // 响应拦截器
        responseInterceptors: result => {
            console.log('实例响应拦截')
            return result
        }
    }
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {MyRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const request = <T = any>(config: MyRequestConfig<T>) => {
    const { method = 'GET' } = config
    if (method === 'get' || method === 'GET') {
        config.params = config.data
    }
    return Server.request<ResType<T>>(config)
}

export default request

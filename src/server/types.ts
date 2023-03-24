import type { InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from 'axios'

/**
 * 拦截器的hooks,在请求或响应被 then 或 catch 处理前拦截
 * @param {requestInterceptors(?)} 发送请求之前拦截器
 * @param {requestInterceptorsCatch(?)} 请求错误拦截器
 * @param {responseInterceptors(?)} 响应成功拦截器
 * @param {responseInterceptorsCatch(?)} 响应失败拦截器
 */
export interface RequestInterceptors {
    // 请求拦截
    requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
    requestInterceptorsCatch?: (error: any) => any
    // 响应拦截
    responseInterceptors?: <T = AxiosResponse>(config: T) => T
    responseInterceptorsCatch?: (error: any) => any
}

/**
 * 实例化Http类的配置项参数,继承于 AxiosRequestConfig
 * @param {interceptors(?)} 拦截器Hooks
 * @param {noLoading} 不显示请求loading
 * @param {...} 其它的配置项
 * @param {AxiosRequestConfig} axios原生的配置选
 */
export interface RequestConfig extends AxiosRequestConfig {
    interceptors?: RequestInterceptors
    noLoading?: boolean
}

export interface CancelRequestSource {
    [index: string]: () => void
}

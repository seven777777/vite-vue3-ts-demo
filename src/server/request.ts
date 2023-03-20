import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig, RequestInterceptors } from './types'
import { showLoading, hideLoading } from '@/utils/loading'
/**
 * 实现功能
 * 1. 可以灵活定制 全局拦截 实例拦截和接口拦截
 */
class Request {
    instance: AxiosInstance // axios实例
    interceptorsObj?: RequestInterceptors //拦截器对象

    constructor(config: RequestConfig) {
        this.instance = axios.create(config)
        this.interceptorsObj = config.interceptors

        // 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
        // 需修改执行顺序可以修改代码顺序
        // 全局请求拦截器
        this.instance.interceptors.request.use(
            (res: any) => {
                console.log('全局请求拦截', res)
                if (!res.noLoading) {
                    showLoading()
                }

                return res
            },
            error => Promise.reject(error)
        )
        // 实例请求拦截器
        this.instance.interceptors.request.use(
            this.interceptorsObj?.requestInterceptors,
            this.interceptorsObj?.requestInterceptorsCatch
        )
        // 实例响应拦截器
        this.instance.interceptors.response.use(
            this.interceptorsObj?.responseInterceptors,
            this.interceptorsObj?.responseInterceptorsCatch
        )
        // 全局响应拦截器
        this.instance.interceptors.response.use(
            res => {
                console.log('全局响应拦截')
                hideLoading()
                return res.data
            },
            error => Promise.reject(error)
        )
    }
    request<T>(config: RequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
            if (config.interceptors?.requestInterceptors) {
                config = config.interceptors.requestInterceptors(config as InternalAxiosRequestConfig)
            }
            this.instance
                .request<any, T>(config)
                .then(res => {
                    // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
                    if (config.interceptors?.responseInterceptors) {
                        res = config.interceptors.responseInterceptors<T>(res)
                    }

                    resolve(res)
                })
                .catch((err: any) => {
                    if (config.interceptors?.responseInterceptorsCatch) {
                        err = config.interceptors.responseInterceptorsCatch(err)
                    }
                    reject(err)
                })
        })
    }
}

export default Request

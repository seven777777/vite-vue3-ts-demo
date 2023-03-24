import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig, RequestInterceptors, CancelRequestSource } from './types'
import { showLoading, hideLoading } from '@/utils/loading'
/**
 * 实现功能
 * 1. 可以灵活定制 全局拦截 实例拦截和接口拦截
 */
class Request {
    instance: AxiosInstance // axios实例
    interceptorsObj?: RequestInterceptors //拦截器对象
    /**
     * 存放取消方法的集合
     * 在创建请求后，将取消请求方法push到该集合中
     * 封装一个方法可以取消请求，传入url: string | string[]
     * 请求之前判断是否有统一URL存在，若存在则取消请求
     */
    cancelRequestSourceList?: CancelRequestSource[]
    /**
     * 存放所有请求url集合
     * 请求前需将url push到该集合中
     * 请求完毕后将其从集合删除
     * 添加在发送请求前完成，删除在响应之后删除
     */
    requestUrlList?: string[]

    constructor(config: RequestConfig) {
        this.instance = axios.create(config)
        this.interceptorsObj = config.interceptors
        this.requestUrlList = []
        this.cancelRequestSourceList = []

        // 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
        // 需修改执行顺序可以修改代码顺序
        // 全局请求拦截器
        this.instance.interceptors.request.use(
            (res: any) => {
                // console.log('全局请求拦截', res)
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
                // console.log('全局响应拦截')
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
            const url = config.url
            // url存至取消请求方法和当前请求url
            if (url) {
                this.requestUrlList?.push(url)
                config.cancelToken = new axios.CancelToken(c => {
                    this.cancelRequestSourceList?.push({ [url]: c })
                })
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
                .finally(() => {
                    url && this.delUrl(url)
                })
        })
    }
    /**
     * @description: 获取指定 url 在 cancelRequestSourceList 中的索引
     * @param {string} url
     * @returns {number} 索引位置
     */
    private getSourceIndex(url: string): number {
        return this.cancelRequestSourceList?.findIndex((item: CancelRequestSource) => {
            return Object.keys(item)[0] === url
        }) as number
    }

    /**
     * @description: 删除 requestUrlList 和 cancelRequestSourceList
     * @param url
     */
    private delUrl(url: string) {
        const urlIndex = this.requestUrlList?.findIndex(u => u === url)
        const sourceIndex = this.getSourceIndex(url)

        urlIndex !== -1 && this.requestUrlList?.splice(urlIndex as number, 1)
        sourceIndex !== -1 && this.cancelRequestSourceList?.splice(sourceIndex as number, 1)
    }

    /**
     * @description: 取消全部请求
     */
    cancelAllRequest() {
        this.cancelRequestSourceList?.forEach(source => {
            const key = Object.keys(source)[0]
            source[key]()
        })
    }
    /**
     * 取消请求
     * @param url
     */
    cancelRequest(url: string | string[]) {
        if (typeof url === 'string') {
            // 取消单个请求
            const sourceIndex = this.getSourceIndex(url)
            sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][url]()
        } else {
            // 存在多个需要取消请求的地址
            url.forEach(u => {
                const sourceIndex = this.getSourceIndex(u)
                sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][u]()
            })
        }
    }
}

export default Request

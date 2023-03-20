import { ElLoading } from 'element-plus'

let requestCount: number = 0 // 统计请求数量

// 初始化loading
let loadingInstance: any

// loading配置
export const LoadingService = {
    lock: true,
    background: 'var(--loading-bg-color)'
}

export const showLoading = () => {
    // 首次请求显示loading
    if (requestCount === 0) {
        loadingInstance = ElLoading.service(LoadingService)
    }
    requestCount++
}

export const hideLoading = () => {
    if (requestCount <= 0) return
    requestCount--
    if (requestCount === 0 && loadingInstance) {
        setTimeout(() => {
            loadingInstance.close()
            loadingInstance = null
        })
    }
}

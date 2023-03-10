import axios from 'axios'

const request = axios.create({
    baseURL: 'http://127.0.0.1:4523/m1/2407937-0-default/', // 基础路径
    timeout: 120000,
    headers: {
        'Content-Type': `application/json; charset=utf-8`
    },
    withCredentials: true
})

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 统一设置用户身份 Token
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    response => {
        // 统一处理响应错误，例如 token 无效、服务端异常等
        return response.data
    },
    err => {
        return Promise.reject(err)
    }
)

export default request

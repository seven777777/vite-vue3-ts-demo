let baseUrl
const env = import.meta.env.MODE
console.log(env)
if (env === 'development') {
    baseUrl = '/api'
} else if (env === 'production') {
    baseUrl = 'http://127.0.0.1:4523/m1/2407937-0-default/api'
}
export default {
    baseUrl
}

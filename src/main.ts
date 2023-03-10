import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'
import router from './router'

import '@/assets/font/iconfont/iconfont.css' //iconfont
// import 'element-plus/dist/index.css';
import '@/assets/style/element.scss'
import '@/assets/style/index.scss'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus, {
    locale: zhCn,
    size: 'small'
})
app.use(router)

app.mount('#app')

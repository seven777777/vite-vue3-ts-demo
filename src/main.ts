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

// 高德地图
import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap'
import '@vuemap/vue-amap/dist/style.css'
initAMapApiLoader({
    key: '7efcc4650d85a1a1219f40c203b917fc',
    securityJsCode: '0c88bd89439dcd794709392b5c8e7cf1'
})

const app = createApp(App)

app.use(VueAMap)
app.use(createPinia())
app.use(ElementPlus, {
    locale: zhCn,
    size: 'small'
})
app.use(router)

app.mount('#app')

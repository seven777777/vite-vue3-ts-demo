import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'
import router from './router'
import type { RouteLocationNormalized } from 'vue-router'
import { useKeepAliveStore } from '@/stores/keepAlive'
import type { ComponentsName } from '@/stores/keepAlive'

import '@/assets/font/iconfont/iconfont.css' //iconfont
import '@/assets/font/iconfont/iconfont.js' //iconfont
// import 'element-plus/dist/index.css';
import '@/assets/style/element.scss'
import '@/assets/style/index.scss'

// 高德地图
// import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap'
// import '@vuemap/vue-amap/dist/style.css'
// initAMapApiLoader({
//     key: '7efcc4650d85a1a1219f40c203b917fc',
//     securityJsCode: '0c88bd89439dcd794709392b5c8e7cf1'
// })
const pinia = createPinia()

const keepAliveStore = useKeepAliveStore(pinia)
// 全局路由拦截
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    $('.layout-content').scrollTop(0)
    if (to.meta.keepAlive) {
        keepAliveStore.addKeepAlive(to.name as ComponentsName)
    }
    if (
        from.name &&
        Array.isArray(to.meta.keepALiveList) &&
        !to.meta.keepALiveList.includes(from.name as ComponentsName)
    ) {
        keepAliveStore.removeKeepAlive(to.name as ComponentsName)
    }
})

const app = createApp(App)

// app.use(VueAMap)
app.use(pinia)
app.use(ElementPlus, {
    locale: zhCn,
    size: 'small'
})
app.use(router)

app.mount('#app')

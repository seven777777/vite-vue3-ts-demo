import { createRouter, createWebHistory } from 'vue-router'

/**
 * meta参数
 * requireAuth  是否需要登录权限
 * gLoading     是否需要全局loading
 * curPageName  对应左侧导航高亮模块
 *  ——不同模块对应
 *      首页：home
 *      地块搜索：landsearch
 * keepAlive    是否缓存该页面。⚠️页面必须有name（组件名）路由配置也要增加name
 *  ——该属性慎用！！！不要随意设置为true。使用时请结合keepAliveMixin的 keepAliveMixin_targetRouteNames
 *  ——⚠️⚠️且在三级路由中无效
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/home',
            component: () => import('@/components/layout/BasePageLayout.vue'),
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: () => import('@/views/homeview/index.vue'),
                    meta: {
                        requireAuth: true,
                        curPageName: 'home'
                    }
                },
                {
                    path: 'landsearch',
                    name: 'landsearch',
                    component: () => import('@/views/landsearch/index.vue'),
                    meta: {
                        requireAuth: true,
                        curPageName: 'landsearch'
                    }
                }
            ]
        }
        // {
        //     path: '/about',
        //     name: 'about',
        //     component: () => import('../views/HomeView.vue')
        // }
    ]
})

export default router

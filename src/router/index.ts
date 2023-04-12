import { createRouter, createWebHistory } from 'vue-router'

/**
 * meta参数
 * requireAuth  是否需要登录权限
 * gLoading     是否需要全局loading
 * curPageName  对应左侧导航高亮模块
 *  ——不同模块对应
 *      首页：home
 *      地块搜索：landsearch
 *      地图工具：maptool
 * keepAlive    是否缓存该页面。⚠️页面必须有name（组件名）路由配置也要增加name
 *  ——该属性慎用！！！不要随意设置为true。使用时请结合使用keepAliveMixin
 *  ——⚠️⚠️且在三级路由中无效
 * keepALiveList    跳转缓存的页面列表
 *  ——当下个路由名不在该数组中时，取消页面的keep alive缓存
 *  ——例如空数组就代表不论去哪个页面，都会取消缓存。相当于清除本页面的缓存状态。
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
                    component: () => import('@/views/homeview/home.vue'),
                    meta: {
                        requireAuth: true,
                        curPageName: 'home',
                        keepAlive: true,
                        keepALiveList: ['landsearch']
                    }
                },
                {
                    path: 'landsearch',
                    name: 'landsearch',
                    component: () => import('@/views/landsearch/landsearch.vue'),
                    meta: {
                        requireAuth: true,
                        curPageName: 'landsearch'
                    }
                },
                {
                    path: 'maptool',
                    name: 'maptool',
                    component: () => import('@/views/maptool/maptool.vue'),
                    meta: {
                        requireAuth: true,
                        curPageName: 'maptool'
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

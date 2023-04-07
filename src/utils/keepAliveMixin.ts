import type { ComponentsName } from '@/stores/keepAlive'
import { onBeforeRouteLeave } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import { useKeepAliveStore } from '@/stores/keepAlive'
const keepAliveStore = useKeepAliveStore()

export function keepAliveMixin(keepALiveList: ComponentsName[]) {
    // 去指定页面时，当前页面要缓存状态。
    // 当下个路由名不在该数组中时，取消页面的keep alive缓存
    // 例如空数组就代表不论去哪个页面，都会取消缓存。相当于清除本页面的缓存状态。
    // 请提供一个数组: ['Refresh']
    const keepAliveMixin_targetRouteNames: ComponentsName[] = keepALiveList
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
        if (from.meta.keepAlive && !keepAliveMixin_targetRouteNames.includes(to.name)) {
            keepAliveStore.removeKeepAlive(from.name)
        }
        next()
    })
}

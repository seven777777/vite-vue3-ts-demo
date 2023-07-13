import type { ComponentsName } from '@/stores/keepAlive'
import { onBeforeRouteLeave } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import { useKeepAliveStore } from '@/stores/keepAlive'
const keepAliveStore = useKeepAliveStore()

export function keepAliveMixin() {
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
        if (
            from.meta.keepAlive &&
            Array.isArray(from.meta.keepALiveList) &&
            !from.meta.keepALiveList.includes(to.name as ComponentsName)
        ) {
            keepAliveStore.removeKeepAlive(from.name as ComponentsName)
        } else {
            keepAliveStore.addKeepAlive(from.name as ComponentsName)
        }
        next()
    })
}

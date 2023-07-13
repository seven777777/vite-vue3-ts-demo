import { defineStore } from 'pinia'
export type ComponentsName = string | RegExp
export interface KeepAliveStore {
    keepAliveComponents: ComponentsName[]
}
export const useKeepAliveStore = defineStore('keepalive', {
    state: (): KeepAliveStore => {
        return {
            keepAliveComponents: [] //缓存页面名
        }
    },
    actions: {
        addKeepAlive(name: ComponentsName) {
            !this.keepAliveComponents.includes(name) && this.keepAliveComponents.push(name)
        },
        removeKeepAlive(name: ComponentsName) {
            const index = this.keepAliveComponents.indexOf(name)
            index !== -1 && this.keepAliveComponents.splice(index, 1)
        }
    }
})

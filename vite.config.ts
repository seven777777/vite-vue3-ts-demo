import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        inject({
            $: 'jquery', // 这里会自动载入 node_modules 中的 jquery
            jQuery: 'jquery',
            'windows.jQuery': 'jquery'
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use '@/assets/style/variables.scss' as *; @use '@/assets/style/mixin.scss' as *;`
            }
        }
    },
    build: {
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString()
                    }
                },
                chunkFileNames: chunkInfo => {
                    const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
                    const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
                    return `js/${fileName}/[name].[hash].js`
                }
            }
        }
    }
})

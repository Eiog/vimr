import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
// import { OnuResolver } from 'eiog-ui'

const r = (src: string) => resolve(__dirname, src)

export default defineConfig({
  plugins: [
    Vue(),
    Unocss(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      ignore: ['h'],
      // resolvers: [OnuResolver()],
      vueTemplate: true,
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      // resolvers: [OnuResolver()],
      dts: 'src/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '~/': r('src/'),
    },
  },
  server: {
    proxy: {
      '/token': {
        target: 'https://sts-eiog-hbgfjplgis.cn-beijing.fcapp.run',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/token/, ''),
      },
    },
  },
})

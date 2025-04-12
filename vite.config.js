import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  base: '/cn-mental-checklist/',
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'dist/index.html',
          dest: '',   // 复制到 dist 根目录
          rename: '404.html'
        }
      ]
    })
  ],
})

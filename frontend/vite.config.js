import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) // 将 @ 指向 src 目录
    }
  },
  server: {
    // 假设你的无线网卡 IP 是 192.168.31.100
    host: true, // 监听所有地址
    port: 5173
  }
})

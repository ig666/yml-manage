import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
	css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'border-radius-base': '6px',
          'primary-color': '#7445c9',
        },
        javascriptEnabled: true,
      }
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://yameila.vip/api/',
        rewrite: path => path.replace(/^\/api/, ''),
        changeOrigin: true,
      }
    }
  }
})

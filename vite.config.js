import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/Portfolio/',
  build: {
    rollupOptions: {
      input: {
        main:   resolve(__dirname, 'index.html'),
        overMij: resolve(__dirname, 'overmij.html'),
      }
    }
  }
})
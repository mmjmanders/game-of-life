import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

const { BASE_PATH } = process.env

// https://vite.dev/config/
export default defineConfig({
  base: BASE_PATH || '/',
  plugins: [
    vue(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      manifest: {
        name: "Conway's Game of Life",
        short_name: 'Game of Life',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
    tailwindcss(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor',
              test: /node_modules\/(vue|pinia)/,
            },
            {
              name: 'fonts',
              test: /node_modules\/@fontsource/,
            },
            {
              name: 'icons',
              test: /node_modules\/@iconify-vue/,
            },
            {
              name: 'forms',
              test: /node_modules\/(@vee-validate|vee-validate|yup)/,
            },
          ],
        },
      },
    },
  },
})

import alias from '@rollup/plugin-alias'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import path from 'node:path'
import { resolve } from 'path'
import { defineConfig } from 'vite'

console.log('----------------')
console.log('@r41/core vite config')
console.log('----------------')


export default defineConfig({
  css: {
    preprocessorOptions: {},
    modules: {
      exportGlobals: true,
      generateScopedName: '[hash:base64:5]',
    },
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  plugins: [
    // vueJsx(),
    vue(),
    alias({
      entries: [
        {
          find: '@r41/core',
          replacement: resolve(__dirname, './src'),
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@r41/core': resolve(__dirname, './src'),

    },
  },
  server: {
    fs: {
      allow: [resolve(__dirname, '..')],
    },
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'r41-core',
      fileName: (format) => `${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
          '@r41/core': 'r41-core',
        },
      },
    },
  },
})

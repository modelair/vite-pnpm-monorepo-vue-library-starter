import alias from '@rollup/plugin-alias'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import fs from 'node:fs'
import path from 'node:path'
import { resolve } from 'path'
import { defineConfig } from 'vite'


export default defineConfig({
  css: {
    preprocessorOptions: {},
    modules: {
      exportGlobals: true,
      generateScopedName: '[hash:base64:5]',
    },
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
  plugins: [
    vue(),
    // viteSingleFile(),
    alias({
      entries: [
        {
          find: '@r41/core',
          replacement: resolve(__dirname, '../core/src'),
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@r41/core': resolve(__dirname, '../core/src'),
    },
  },
  server: {
    fs: {
      allow: [resolve(__dirname, '..')],
    },
  },
   optimizeDeps: {
    include: ['@r41/core'],
  },
  build: {

    // cssCodeSplit: true,
    emptyOutDir: false,
    commonjsOptions: {
      include: ['@r41/core'],
    },
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'r41-core',
      fileName: (format) => `${format}.js`,
    },
    rollupOptions: {

      external: ['vue', '@r41/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@r41/core': 'r41-core',
          '@r41/core-as-dep': 'r41-core-as-dep',
        },
      },
    },
  },
})

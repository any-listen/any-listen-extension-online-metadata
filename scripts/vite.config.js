import { defineConfig } from 'vite'
import path from 'node:path'
import { EXTENSION } from './constants.js'

const isProd = process.env.NODE_ENV == 'production'
const rootPath = path.join(import.meta.dirname, '../')
const projectPath = path.join(rootPath, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  mode: process.env.NODE_ENV,
  publicDir: false,
  resolve: {
    alias: {
      '@': projectPath,
    },
  },
  build: {
    emptyOutDir: true,
    minify: false,
    watch: isProd
      ? null
      : {
          buildDelay: 500,
        },
    outDir: path.join(rootPath, 'dist'),
    rollupOptions: {
      input: path.join(projectPath, 'index.ts'),
      output: {
        entryFileNames: EXTENSION.enterFileName,
        format: 'esm',
        experimentalMinChunkSize: 50_000,
      },
    },
  },
})

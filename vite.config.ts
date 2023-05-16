import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import typescript from '@rollup/plugin-typescript';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.tsx'),
      name: 'RcAwsomeColorPicker',
      formats: ['es', 'cjs'],
      fileName: 'rc-awsome-color-picker',
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React'
        },
        chunkFileNames: '[name].js'
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, './lib'),
      "@components": resolve(__dirname, './lib/components'),
      "@icon": resolve(__dirname, './lib/icon'),
      "@utils": resolve(__dirname, './lib/utils'),
    }
  },
  plugins: [
    svgr(),
    react({
      jsxRuntime: 'automatic',
    }),
    // 生成ts声明文件
    typescript({
      target: 'es5',
      rootDir: resolve('lib'),
      declaration: true,
      declarationDir: resolve('dist/types'),
      exclude: resolve('node_modules/**'),
      allowSyntheticDefaultImports: true,
    }),
  ],
})

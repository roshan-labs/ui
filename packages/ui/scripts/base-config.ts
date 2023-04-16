import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { dependencies, peerDependencies } from '../package.json'

const deps = [...Object.keys(dependencies), ...Object.keys(peerDependencies)]
const rollupOptions = { external: deps }

/**
 * 获取打包默认配置
 *
 * @param entry 入口文件地址
 * @param format 构建格式
 * @returns vite 打包配置
 */
export const createBaseConfig = (entry: string, format: 'cjs' | 'iife' | 'es') => {
  const config: UserConfig = {
    build: {
      lib: {
        entry,
        formats: [format],
        fileName: 'index',
        // iife, umd 需要
        name: 'RoshanUI',
      },
      rollupOptions:
        format === 'iife'
          ? {
              ...rollupOptions,
              output: {
                globals: {
                  vue: 'Vue',
                  '@vueuse/core': 'VueUse',
                  'element-plus': 'ElementPlus',
                },
              },
            }
          : rollupOptions,
      outDir: `dist/${format}`,
      sourcemap: true,
      cssCodeSplit: false,
      minify: 'esbuild',
    },
    plugins: [vue({ isProduction: true })],
  }

  return config
}

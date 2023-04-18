import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

import { dependencies, peerDependencies, optionalDependencies } from '../package.json'

const deps = [
  ...Object.keys(dependencies),
  ...Object.keys(peerDependencies),
  ...Object.keys(optionalDependencies),
]
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
                  'vue-router': 'VueRouter',
                  '@vueuse/core': 'VueUse',
                  'element-plus': 'ElementPlus',
                  '@element-plus/icons-vue': 'ElementPlusIconsVue',
                },
              },
            }
          : rollupOptions,
      outDir: `dist/${format}`,
      sourcemap: true,
      cssCodeSplit: false,
      minify: 'terser',
      terserOptions: {
        keep_fnames: true,
      },
    },
    plugins: [vue({ isProduction: true })],
  }

  if (format === 'es') {
    config.plugins?.push(chunkSplitPlugin({ strategy: 'unbundle' }))
  }

  return config
}

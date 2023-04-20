import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { dependencies, peerDependencies, optionalDependencies } from '../package.json'

const deps = [
  ...Object.keys(dependencies),
  ...Object.keys(peerDependencies),
  ...Object.keys(optionalDependencies),
]

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
      rollupOptions: {
        external: deps,
        output: {
          chunkFileNames: format === 'es' ? '[name].mjs' : '[name].js',
        },
      },
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

  if (format === 'iife') {
    config.build!.rollupOptions!.output = {
      globals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        '@vueuse/core': 'VueUse',
        'element-plus': 'ElementPlus',
        '@element-plus/icons-vue': 'ElementPlusIconsVue',
      },
    }
  }

  return config
}

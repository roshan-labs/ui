import type { ModuleOptions as WindiOptions } from 'nuxt-windicss'
import { installModule, resolvePath, useNuxt } from '@nuxt/kit'
import { defu } from 'defu'

import type { ModuleOptions, ResolveRuntime } from '../types'

export const useStyles = async (options: ModuleOptions, resolveRuntime: ResolveRuntime) => {
  const nuxt = useNuxt()

  nuxt.options.css.unshift(
    'element-plus/dist/index.css',
    // 定制主题文件
    // resolveRuntime('./assets/style.css'),
    'virtual:windi.css'
  )

  if (options.windicss) {
    const componentsPath = resolveRuntime('./components')

    // 忽略 element-plus index.css 文件规则
    nuxt.options.windicss = defu<WindiOptions, WindiOptions[]>(
      {
        scan: {
          include: [`${componentsPath}/**/*.{vue,tsx}`],
          exclude: [await resolvePath('element-plus/dist/index.css')],
        },
      },
      nuxt.options.windicss || {}
    )

    await installModule('nuxt-windicss')
  }
}

declare module '@nuxt/schema' {
  interface NuxtOptions {
    windicss?: WindiOptions
  }
}

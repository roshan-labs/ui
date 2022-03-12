import { existsSync } from 'fs'
import {
  addComponentsDir,
  createResolver,
  defineNuxtModule,
  installModule,
  requireModule,
  resolvePath,
} from '@nuxt/kit'
import WindiModule from 'nuxt-windicss'
import defu from 'defu'
import type { ModuleOptions as WindiModuleOptions } from 'nuxt-windicss'

import { name as packageName, version } from '../package.json'
import defaultWindiConfig from './runtime/windicss'

export interface ModuleOptions {
  /** 组件前缀 */
  prefix?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: packageName,
    version,
    configKey: 'nuxtUI',
  },
  defaults: {
    prefix: 'n',
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const componentsPath = resolver.resolve('./runtime/components')
    const defaultWindiOptions: WindiModuleOptions = {
      scan: {
        include: [`${componentsPath}/**/*.{vue,html,jsx,tsx}`],
      },
    }
    const jsWindiConfigPath = await resolvePath('windi.config.js')
    const tsWindiConfigPath = await resolvePath('windi.config.ts')

    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    let windiConfig: any = {}

    if (typeof nuxt.options?.windicss?.config === 'string') {
      windiConfig = requireModule(nuxt.options.windicss.config, { clearCache: true })
    } else if (typeof nuxt.options?.windicss?.config === 'object') {
      windiConfig = nuxt.options.windicss.config
    } else if (existsSync(jsWindiConfigPath) || existsSync(tsWindiConfigPath)) {
      windiConfig = requireModule(
        existsSync(jsWindiConfigPath) ? jsWindiConfigPath : tsWindiConfigPath
      )
    }

    windiConfig = defu(windiConfig, defaultWindiConfig)

    // 注册组件
    await addComponentsDir({
      path: componentsPath,
      prefix: options.prefix,
    })

    await installModule(WindiModule, {
      ...defu(nuxt.options.windicss || {}, defaultWindiOptions),
      config: windiConfig,
    } as WindiModuleOptions)
  },
})

// 修复 nuxt-windicss 模块未导出类型
declare module '@nuxt/schema' {
  interface NuxtOptions {
    windicss?: WindiModuleOptions
  }

  interface NuxtConfig {
    nuxtUI?: ModuleOptions
  }
}

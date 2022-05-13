import { existsSync } from 'node:fs'
import {
  addComponentsDir,
  createResolver,
  defineNuxtModule,
  installModule,
  resolvePath,
} from '@nuxt/kit'
import IconModule from '@roshan-labs/icon-module'
import type { FullConfig } from 'windicss/types/interfaces'
import type { ModuleOptions as WindiModuleOptions } from 'nuxt-windicss'
import WindiModule from 'nuxt-windicss'
import { defu } from 'defu'

import { name, version } from '../package.json'
import { extendWindiConfig } from './runtime/windicss'
import { extendIconConfig } from './runtime/icon'

export interface ModuleOptions {
  /** 组件前缀 */
  prefix?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'ui',
  },
  defaults: {
    prefix: 'n',
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const componentsPath = resolver.resolve('./runtime/components')
    const windiConfigPath = await resolvePath('windi.config')
    const windiOptions: WindiModuleOptions = {
      scan: { include: [`${componentsPath}/**/*.{vue,tsx}`] },
    }

    let windiConfig: FullConfig | string | undefined

    if (nuxt.options.windicss?.config) {
      windiConfig = nuxt.options.windicss?.config
    }

    if (typeof windiConfig === 'object') {
      windiConfig = extendWindiConfig(windiConfig)
    }

    if (!windiConfig && !existsSync(windiConfigPath)) {
      windiConfig = extendWindiConfig()
    }

    await addComponentsDir({
      path: componentsPath,
      prefix: options.prefix,
      extensions: ['vue'],
    })

    // Install unplugin-icons module
    nuxt.options.icons = extendIconConfig(nuxt.options.icons)
    await installModule(IconModule)

    // Install windicss module
    nuxt.options.windicss = {
      ...defu(nuxt.options.windicss, windiOptions),
      config: windiConfig,
    }
    await installModule(WindiModule)
  },
})

declare module '@nuxt/schema' {
  interface NuxtOptions {
    windicss?: WindiModuleOptions
  }
}

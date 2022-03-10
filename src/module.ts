import { addComponentsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'
import WindiModule from 'nuxt-windicss'
import type { ModuleOptions as WindiModuleOptions } from 'nuxt-windicss'

import { name as packageName, version } from '../package.json'

export interface ModuleOptions {
  /** 组件前缀 */
  prefix?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: packageName,
    version,
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

    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    // 注册组件
    await addComponentsDir({
      path: componentsPath,
      prefix: options.prefix,
    })

    await installModule(WindiModule, defaultWindiOptions)
  },
})

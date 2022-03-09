import {
  addComponentsDir,
  createResolver,
  defineNuxtModule,
  installModule,
  requireModule,
} from '@nuxt/kit'
import defu from 'defu'
import WindiModule from 'nuxt-windicss'

import { name as packageName, version } from '../package.json'
import uiConfig from './windicss'

export interface ModuleOptions {
  /** 组件前缀 */
  prefix?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: packageName,
    version,
    configKey: 'roshanUI',
  },
  defaults: {
    prefix: 'n',
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    let windiConfig: any = {}

    // 获取 windicss 配置
    if (typeof (nuxt.options as any)?.windicss?.config === 'string') {
      windiConfig = requireModule((nuxt.options as any).windicss.config, {
        clearCache: true,
      })
    } else if (typeof (nuxt.options as any)?.windicss?.config === 'object') {
      windiConfig = (nuxt.options as any).windicss.config
    }

    windiConfig = defu(windiConfig, uiConfig)

    // 注册组件库组件
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      prefix: options.prefix,
    })

    await installModule(WindiModule, {
      ...((nuxt.options as any).windicss || {}),
      config: windiConfig,
    })
  },
})

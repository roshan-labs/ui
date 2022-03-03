import { fileURLToPath } from 'url'
import { addComponentsDir, defineNuxtModule, installModule } from '@nuxt/kit'
import UnocssModule from '@unocss/nuxt'

import { name as packageName, version } from '../package.json'
import { extendUnocssOptions } from './runtime/unocss'

const getPath = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export interface ModuleOptions {
  prefix: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: packageName,
    version,
  },
  defaults: {
    prefix: 'n',
  },
  async setup(_, nuxt) {
    nuxt.options.build.transpile.push(getPath('./runtime'))
    // 注册组件
    addComponentsDir({
      path: getPath('./runtime/components'),
      prefix: 'n',
    })

    // 合并 unocss 默认规则与用户自定义规则
    nuxt.options.unocss = extendUnocssOptions(nuxt.options.unocss)

    await installModule(UnocssModule)
  },
})

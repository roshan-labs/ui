import { fileURLToPath } from 'url'
import { defineNuxtModule, installModule } from '@nuxt/kit'
import UnocssModule from '@unocss/nuxt'

import { name as packageName, version } from '../package.json'
import { extendUnocssOptions } from './runtime/unocss'

export default defineNuxtModule({
  meta: {
    name: packageName,
    version,
  },
  async setup(_, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    // 合并 unocss 默认规则与用户自定义规则
    nuxt.options.unocss = extendUnocssOptions(nuxt.options.unocss)

    await installModule(UnocssModule)
  },
})

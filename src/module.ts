// import { fileURLToPath } from 'url'
import { defineNuxtModule, installModule } from '@nuxt/kit'
import UnocssModule from '@unocss/nuxt'

import { name as moduleName, version } from '../package.json'

export default defineNuxtModule({
  meta: {
    name: moduleName,
    version,
  },
  setup(_, nuxt) {
    // const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    // nuxt.options.build.transpile.push(runtimeDir)

    installModule(UnocssModule)
  },
})

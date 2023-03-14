import { createResolver, defineNuxtModule } from '@nuxt/kit'

import type { ModuleOptions } from './types'
import { useComponents } from './composables/use-components'
import { useComposables } from './composables/use-composables'
// import { usePlugin } from './composables/use-plugin'
import { useStyles } from './composables/use-styles'

export { ModuleOptions }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@roshan-labs/ui',
    configKey: 'ui',
  },
  async setup(options) {
    const { resolve } = createResolver(import.meta.url)
    const resolveRuntime = (filePath: string) => resolve('./runtime', filePath)

    // nuxt.options.build.transpile.push(resolve('./runtime'))

    await useStyles(options, resolveRuntime)
    useComposables(resolveRuntime)
    useComponents()
    // usePlugin(resolveRuntime)
  },
})

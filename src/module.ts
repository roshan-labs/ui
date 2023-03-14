import { createResolver, defineNuxtModule } from '@nuxt/kit'

import type { ModuleOptions } from './types'
import { useComponents } from './composables/use-components'
import { useComposables } from './composables/use-composables'
import { useInjection } from './composables/use-injection'
import { useTeleport } from './composables/use-teleport'
import { useStyles } from './composables/use-styles'

export { ModuleOptions }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@roshan-labs/ui',
    configKey: 'ui',
  },
  defaults: {
    windicss: false,
    namespace: 'el',
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const resolveRuntime = (filePath: string) => resolve('./runtime', filePath)

    if (nuxt.options.ssr) {
      useInjection()
      useTeleport(options)
    }

    await useStyles(options, resolveRuntime)
    useComposables(resolveRuntime)
    useComponents()
  },
})

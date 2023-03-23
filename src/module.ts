import { createResolver, defineNuxtModule, installModule } from '@nuxt/kit'

import type { ModuleOptions } from './types'
import { useTranspile } from './composables/use-transpile'
import { useComponents } from './composables/use-components'
import { useComposables } from './composables/use-composables'
import { useInjection } from './composables/use-injection'
import { useTeleport } from './composables/use-teleport'
import { useStyles } from './composables/use-styles'
import { useTransform } from './composables/use-transform'

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

    useTranspile()

    if (nuxt.options.ssr) {
      useInjection()
      useTeleport(options)
    }

    await useStyles(options, resolveRuntime)
    useComposables(resolveRuntime)
    useComponents(resolveRuntime)
    useTransform()

    await installModule('@vueuse/nuxt')
  },
})

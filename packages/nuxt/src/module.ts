import { createResolver, defineNuxtModule } from '@nuxt/kit'

import type { ModuleOptions } from './types'
import { useTranspile } from './composables/use-transpile'
import { useInjection } from './composables/use-injection'
import { useTeleport } from './composables/use-teleport'
import { useStyles } from './composables/use-styles'
import { useComponents } from './composables/use-components'
import { useTransform } from './composables/use-transform'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@roshan-ui/nuxt',
    configKey: 'roshan',
  },
  defaults: {
    utilityClass: true,
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
    useComponents()
    useTransform()
  },
})

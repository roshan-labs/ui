import { createResolver, defineNuxtModule } from '@nuxt/kit'

import type { ModuleOptions } from './types'
import { useStyles } from './composables/use-styles'
import { useComponents } from './composables/use-components'
import { useComposables } from './composables/use-composables'
import { usePlugin } from './composables/use-plugin'

export { ModuleOptions }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@roshan-labs/ui',
    configKey: 'ui',
  },
  defaults: {
    windicss: true,
  },
  setup(options) {
    const { resolve } = createResolver(import.meta.url)
    const resolveRuntime = (path: string) => resolve('./runtime', path)

    useStyles(options, resolveRuntime)
    useComponents(resolveRuntime)
    useComposables(resolveRuntime)
    usePlugin(resolveRuntime)
  },
})

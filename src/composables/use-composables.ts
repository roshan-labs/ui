import { addImports } from '@nuxt/kit'

import type { ResolveRuntime } from '../types'
import * as composables from '../runtime/composables'

export const useComposables = (resolveRuntime: ResolveRuntime) => {
  const composablesFile = resolveRuntime('composables')

  Object.keys(composables).forEach((name) => {
    addImports({ name, from: composablesFile })
  })
}

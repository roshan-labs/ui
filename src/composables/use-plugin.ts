import { addPlugin } from '@nuxt/kit'

import type { ResolveRuntime } from '../types'

export const usePlugin = (resolveRuntime: ResolveRuntime) => {
  addPlugin(resolveRuntime('plugin'))
}

import { addComponent } from '@nuxt/kit'

import type { ResolveRuntime } from '../types'
import { components, proComponents } from '../config'

export const useComponents = (resolveRuntime: ResolveRuntime) => {
  components.forEach((name) => {
    addComponent({
      filePath: 'element-plus',
      export: name,
      name,
    })
  })

  proComponents.forEach(({ dirname, name }) => {
    addComponent({
      filePath: resolveRuntime(`components/${dirname}`),
      export: name,
      name,
    })
  })
}

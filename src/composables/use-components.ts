import { addComponent } from '@nuxt/kit'

import type { ResolveRuntime } from '../types'
import { baseComponents, proComponents } from '../config'
import { hyphenate } from '../utils'

export const useComponents = (resolveRuntime: ResolveRuntime) => {
  const components = new Set([...baseComponents])

  components.forEach((name) => {
    const dir = hyphenate(name.slice(2))

    addComponent({
      name,
      export: name,
      filePath: `element-plus/es/components/${dir}/index`,
    })
  })

  proComponents.forEach(({ dirname, name }) => {
    addComponent({
      filePath: resolveRuntime(`components/${dirname}`),
      export: name,
      name,
    })
  })

  // await installModule('@element-plus/nuxt')
}

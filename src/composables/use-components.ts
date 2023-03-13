import { addComponent } from '@nuxt/kit'

import type { ResolveRuntime } from '../types'
import { baseComponents, subComponents, proComponents } from '../config'
import { hyphenate } from '../utils'

export const useComponents = (resolveRuntime: ResolveRuntime) => {
  const components = new Set([...baseComponents])

  const subComponentsMap = Object.fromEntries<string>(
    Object.entries(subComponents).reduce((all, [key, values]) => {
      values.forEach((item) => {
        all.push([item, key])
      })
      return all
    }, [] as unknown as [string, any])
  )

  components.forEach((name) => {
    const componentName = subComponentsMap[name] || name
    const dir = hyphenate(componentName.slice(2))

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
}

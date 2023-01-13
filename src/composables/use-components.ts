import { addComponent } from '@nuxt/kit'

// import type { ResolveRuntime } from '../types'
import { components } from '../config'

export function useComponents() {
  components.forEach((name) => {
    addComponent({
      filePath: 'element-plus',
      export: name,
      name,
    })
  })
}

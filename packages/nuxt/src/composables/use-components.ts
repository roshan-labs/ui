import { addComponent } from '@nuxt/kit'

import { baseComponents, subComponents, proComponents, proLibraryName } from '../config'
import { hyphenate } from '../utils'

export const useComponents = () => {
  const components = new Set([...baseComponents])

  const subComponentsMap = Object.fromEntries<string>(
    Object.entries(subComponents).reduce((all, [key, values]) => {
      values.forEach((item) => {
        all.push([item, key])
      })
      return all
    }, [] as unknown as [string, any])
  )

  // 导入 element-plus 组件
  components.forEach((name) => {
    const componentName = subComponentsMap[name] || name
    const dir = hyphenate(componentName.slice(2))

    addComponent({
      name,
      export: name,
      filePath: `element-plus/es/components/${dir}/index`,
    })
  })

  // 导入 roshan-ui 扩展组件
  proComponents.forEach((name) => {
    addComponent({
      name,
      export: name,
      filePath: proLibraryName,
    })
  })
}

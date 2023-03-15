import type { PresetImport } from './types'
import { libraryName } from './config'

export const hyphenate = (value: string) => value.replace(/\B([A-Z])/g, '-$1').toLowerCase()

export const camelize = (value: string) =>
  value
    .split('-')
    .reduce(
      (prev, item) => `${prev}${item.slice(0, 1).toUpperCase()}${item.slice(1, item.length)}`,
      ''
    )

export const genLibraryImport = (list: PresetImport[]) => {
  const values = list.map((item) => {
    if (Array.isArray(item)) {
      const [name, alias] = item
      return `${name} as ${alias}`
    }

    return item
  })

  return `import { ${values.join(',')} } from '${libraryName}';`
}

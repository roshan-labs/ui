import { useNuxt } from '@nuxt/kit'
import { createUnplugin } from 'unplugin'
import MagicString from 'magic-string'

import { libraryName, directives } from '../config'
import { camelize, hyphenate, genLibraryImport } from '../utils'

const directivesRegExp = /(?<=[ (])_?resolveDirective\(\s*["']([^'"]*?)["'][\s,]*[^)]*\)/g

const getDirectiveStyle = (name: string) => {
  const dir = hyphenate(name.slice(2))

  return `${libraryName}/es/components/${dir}/style/css`
}

const getDirectiveConfig = (name: string): [name: string, style?: string] | undefined => {
  if (directives[name]) {
    const [directive, styleName] = directives[name]
    const style = styleName && getDirectiveStyle(styleName)

    return [directive, style]
  }
}

const plugin = createUnplugin(() => {
  return {
    name: `${libraryName}-transform`,
    transform(code, id) {
      const s = new MagicString(code)
      const imports = new Set<string>()
      const directiveList: [string, string][] = []
      let no = 0

      s.replaceAll(directivesRegExp, (origin, name) => {
        const directiveConfig = getDirectiveConfig(camelize(name))

        if (directiveConfig) {
          const [directive] = directiveConfig
          const aliasName = `__el_directive_${no}`

          no += 1
          directiveList.push([directive, aliasName])
          return aliasName
        }

        return origin
      })

      if (directiveList.length > 0) {
        imports.add(genLibraryImport(directiveList))
      }

      if (imports.size > 0) {
        s.prepend([...imports, ''].join('\n'))
      }

      if (s.hasChanged()) {
        return {
          code: s.toString(),
          map: s.generateMap({ source: id, includeContent: true }),
        }
      }
    },
  }
})

export const useTransform = () => {
  const nuxt = useNuxt()

  nuxt.hook('vite:extendConfig', (config) => {
    config.plugins = config.plugins || []
    config.plugins.push(plugin.vite())
  })

  nuxt.hook('webpack:config', (configs) => {
    configs.forEach((config) => {
      config.plugins = config.plugins || []
      config.plugins.push(plugin.webpack())
    })
  })
}

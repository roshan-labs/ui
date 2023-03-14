import { useNuxt } from '@nuxt/kit'
import { createUnplugin } from 'unplugin'
import MagicString from 'magic-string'

import { libraryName } from '../config'

const directivesRegExp = /(?<=[ (])_?resolveDirective\(\s*["']([^'"]*?)["'][\s,]*[^)]*\)/g

const plugin = createUnplugin(() => {
  return {
    name: `${libraryName}-transform`,
    transform(code) {
      const s = new MagicString(code)

      s.replaceAll(directivesRegExp, (match, name) => {
        console.log(name)
        return match
      })

      return null
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

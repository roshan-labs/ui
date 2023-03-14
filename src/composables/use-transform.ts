import { createUnplugin } from 'unplugin'
import { useNuxt } from '@nuxt/kit'

import { libraryName } from '../config'

const plugin = createUnplugin(() => {
  return {
    name: `${libraryName}-transform`,
    transform() {
      // console.log(code)

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

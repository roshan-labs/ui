import { installModule, useNuxt } from '@nuxt/kit'

import type { ModuleOptions } from '../types'
import { baseLibraryName } from '../config'

export const useStyles = async (options: ModuleOptions) => {
  const nuxt = useNuxt()
  const cssPath = `${baseLibraryName}/dist/index.css`

  // 开启工具类支持
  if (options.tailwindcss) {
    await installModule('@nuxtjs/tailwindcss')
  }

  nuxt.options.css.unshift(cssPath)
}

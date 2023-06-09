import { installModule, useNuxt } from '@nuxt/kit'
import { defu } from 'defu'

import type { ModuleOptions, ResolveRuntime } from '../types'
import { baseLibraryName } from '../config'

export const useStyles = async (options: ModuleOptions, resolveRuntime: ResolveRuntime) => {
  const nuxt = useNuxt()
  const cssPath = `${baseLibraryName}/dist/index.css`

  // 开启工具类支持
  if (options.tailwindcss) {
    nuxt.options.tailwindcss = defu(nuxt.options.tailwindcss, {
      cssPath: resolveRuntime('tailwind.css'),
    }) as any

    await installModule('@nuxtjs/tailwindcss')
  } else {
    nuxt.options.css.unshift(cssPath)
  }
}

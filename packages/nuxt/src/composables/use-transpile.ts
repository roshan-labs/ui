import { useNuxt } from '@nuxt/kit'

import { baseLibraryName, proLibraryName } from '../config'

export const useTranspile = () => {
  const nuxt = useNuxt()

  nuxt.options.build.transpile.push(baseLibraryName, proLibraryName)
}

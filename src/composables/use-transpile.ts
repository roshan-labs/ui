import { useNuxt } from '@nuxt/kit'

import { libraryName } from '../config'

export const useTranspile = () => {
  const nuxt = useNuxt()

  nuxt.options.build.transpile.push(libraryName)
}

import { addPluginTemplate } from '@nuxt/kit'

import { baseLibraryName, injectionKey } from '../config'

export const useInjection = () => {
  addPluginTemplate({
    filename: `${baseLibraryName}-injection.mjs`,
    getContents: () => `
      import { ID_INJECTION_KEY } from 'element-plus'

      import { defineNuxtPlugin } from '#imports'

      export default defineNuxtPlugin((nuxtApp) => {
        nuxtApp.vueApp.provide(ID_INJECTION_KEY, ${JSON.stringify(injectionKey)})
      })
    `,
  })
}

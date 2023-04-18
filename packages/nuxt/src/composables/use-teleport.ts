import { addPluginTemplate } from '@nuxt/kit'

import type { ModuleOptions } from '../types'
import { libraryName } from '../config'

export const useTeleport = (options: ModuleOptions) => {
  const defaultId = `#${options.namespace}-popper-container-`

  addPluginTemplate({
    filename: `${libraryName}-teleport.mjs`,
    getContents: () => `
      import { defineNuxtPlugin } from '#imports'

      const renderTeleports = (teleports) => {
        const body = Object.entries(teleports).reduce((all, [key, value]) => {
          if (key.startsWith('${defaultId}') || [].includes(key)) {
            return \`\${all}<div id="\${key.slice(1)}">\${value}</div>\`
          }
          return all
        }, teleports.body || '')

        return { ...teleports, body }
      }

      export default defineNuxtPlugin((nuxtApp) => {
        nuxtApp.hook('app:rendered', (ctx) => {
          if (ctx.ssrContext?.teleports) {
            ctx.ssrContext.teleports = renderTeleports(ctx.ssrContext.teleports)
          }
        })
      })
    `,
  })
}

import type { UnocssNuxtOptions } from '@unocss/nuxt'
import type { Preset, RuleContext } from '@unocss/core'
import type { Theme } from '@unocss/preset-mini'
import { mergeDeep } from '@unocss/core'
import { presetMini, theme } from '@unocss/preset-mini'
import presetAttributify from '@unocss/preset-attributify'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'

const uiPreset: Preset = {
  name: 'nuxt-ui',
  theme: mergeDeep(theme, {
    colors: {
      primary: '#2f54eb',
    },
  }),
  rules: [
    [
      /^text-(.*)$/,
      ([, c]: string[], { theme }: RuleContext<Theme>) => {
        if (theme.colors[c]) {
          return { color: `${theme.colors[c]}` }
        }
      },
    ],
  ],
}

export function extendUnocssOptions(userOptions: UnocssNuxtOptions = {}): UnocssNuxtOptions {
  return {
    preflight: true,
    uno: false,
    presets: [presetMini(), presetAttributify(), uiPreset],
    transformers: [transformerVariantGroup(), transformerDirectives()],
    ...userOptions,
  }
}

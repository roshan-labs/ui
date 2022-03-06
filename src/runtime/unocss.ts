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
    fontSize: {
      base: ['14px'],
    },
    colors: {
      primary: {
        5: '#597ef7',
        6: '#2f54eb',
        7: '#1d39c4',
      },
      gray: {
        5: '#d9d9d9',
      },
      dark: {
        base: '#000000d9',
      },
    },
    lineHeight: {
      base: '1.5715',
    },
  }),
  rules: [
    [/^touch-(.+)$/, ([, v]) => ({ 'touch-action': v })],
    // [
    //   /^text-(.*)$/,
    //   ([, v]: string[], { theme }: RuleContext<Theme>) => {
    //     if (theme.colors && theme.colors[v]) {
    //       return { color: `${theme.colors[v]}` }
    //     }
    //   },
    // ],
  ],
  shortcuts: {
    // button
    'n-button':
      'relative inline-block leading-base font-400 whitespace-normal text-center border-1 cursor-pointer select-none touch-manipulation h-32px px-15px py-4px text-14px rounded-2px text-dark-base border-gray-5 bg-white outline-0 active:outline-0 focus:outline-0',
    'n-button-default':
      'active:(text-primary-7 border-primary-7) focus:(text-primary-5 border-primary-5) hover:(text-primary-5 border-primary-5)',
    'n-button-primary':
      'text-white border-primary-6 bg-primary-6 hover:(text-white border-primary-5 bg-primary-5) focus:(text-white border-primary-5 bg-primary-5) active:(text-white border-primary-7 bg-primary-7)',
    'n-button-dashed':
      'border-dashed hover:(text-primary-5 border-primary-5) focus:(text-primary-5 border-primary-5) active:(text-primary-7 border-primary-7)',
  },
}

export function extendUnocssOptions(userOptions: UnocssNuxtOptions = {}): UnocssNuxtOptions {
  return {
    preflight: false,
    uno: false,
    presets: [presetMini(), presetAttributify(), uiPreset],
    transformers: [transformerVariantGroup(), transformerDirectives()],
    ...userOptions,
  }
}

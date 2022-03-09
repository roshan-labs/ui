import type { UnocssNuxtOptions } from '@unocss/nuxt'
import type { Preset, RuleContext } from '@unocss/core'
import type { Theme } from '@unocss/preset-mini'
import { mergeDeep } from '@unocss/core'
import { presetMini, theme } from '@unocss/preset-mini'
import presetAttributify from '@unocss/preset-attributify'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'

const uiPreset: Preset = {
  name: 'ui',
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
        3: '#f5f5f5',
        5: '#d9d9d9',
      },
      dark: {
        base: '#000000d9',
      },
      error: {
        base: '#ff4d4f',
        hover: '#ff7875',
        active: '#d9363e',
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
      'relative inline-block leading-base font-400 whitespace-normal text-center border-1 cursor-pointer select-none touch-manipulation h-32px px-15px py-4px text-14px rounded-2px text-dark-base border-gray-5 bg-white outline-0 hover:no-underline active:outline-0 focus:outline-0',
    'n-button-default':
      'active:(text-primary-7 border-primary-7) focus:(text-primary-5 border-primary-5) hover:(text-primary-5 border-primary-5) !disabled:(text-op25 text-black border-gray-5 bg-gray-3 cursor-not-allowed shadow-none text-shadow-none)',
    'n-button-primary':
      'text-white border-primary-6 bg-primary-6 hover:(text-white border-primary-5 bg-primary-5) focus:(text-white border-primary-5 bg-primary-5) active:(text-white border-primary-7 bg-primary-7) !disabled:(text-op25 text-black border-gray-5 bg-gray-3 cursor-not-allowed shadow-none text-shadow-none)',
    'n-button-dashed':
      'border-dashed hover:(text-primary-5 border-primary-5) focus:(text-primary-5 border-primary-5) active:(text-primary-7 border-primary-7) !disabled:(text-op25 text-black border-gray-5 bg-gray-3 cursor-not-allowed shadow-none text-shadow-none)',
    'n-button-text':
      'border-transparent bg-transparent text-dark-base hover:(text-dark-base bg-black bg-op1.8 border-transparent) focus:(text-dark-base bg-black bg-op1.8 border-transparent) active:(text-dark-base bg-black bg-op2.8 border-transparent)',
    'n-button-link':
      'text-primary-6 border-transparent bg-transparent shadow-none hover:(text-primary-5 border-transparent bg-transparent) focus:(text-primary-5 border-transparent bg-transparent) active:(text-primary-7 border-transparent bg-transparent)',
    'n-button-block': 'w-full',
    'n-button-default-danger':
      'text-error-base border-error-base !hover:(text-error-hover border-error-hover) !focus:(text-error-hover border-error-hover) !active:(text-error-active border-error-active)',
    'n-button-dashed-danger': 'n-button-default-danger',
    'n-button-primary-danger':
      'bg-error-base border-error-base hover:(bg-error-hover border-error-hover) focus:(bg-error-hover border-error-hover) active:(bg-error-active border-error-active)',
    'n-button-text-danger':
      'text-error-base hover:text-error-hover focus:text-error-hover active:text-error-active',
    'n-button-link-danger': 'n-button-text-danger',
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

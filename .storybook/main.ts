import type { StorybookConfig } from '@storybook/vue3-vite'
import WindiCSS from 'vite-plugin-windicss'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: (config, { configType }) => {
    if (configType === 'PRODUCTION') {
      config.base = '/ui/'
    }

    config.plugins?.push(WindiCSS())

    return config
  },
}

export default config

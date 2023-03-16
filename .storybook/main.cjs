const WindiCSS = require('vite-plugin-windicss').default

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite',
  },
  viteFinal(config, { configType }) {
    if (configType === 'PRODUCTION') {
      config.base = '/ui/'
    }

    config.plugins.push(WindiCSS())
    return config
  },
}

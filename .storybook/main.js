const WindiCSS = require('windicss-webpack-plugin')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/vue3',
  // core: {
  //   builder: 'storybook-builder-vite',
  // },
  webpackFinal(config) {
    config.plugins.push(new WindiCSS())
    return config
  },
}

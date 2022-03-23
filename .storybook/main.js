const WindiCSS = require('windicss-webpack-plugin')
const UnpluginIcon = require('unplugin-icons/webpack')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/vue3',
  webpackFinal(config) {
    config.plugins.push(new WindiCSS())
    config.plugins.push(UnpluginIcon({ autoInstall: true }))
    return config
  },
}

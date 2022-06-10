const WindiCSS = require('vite-plugin-windicss').default
const UnpluginIcon = require('unplugin-icons/vite')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite',
  },
  viteFinal(config) {
    config.plugins.push(
      WindiCSS(),
      UnpluginIcon({
        autoInstall: true,
        iconCustomizer(_collection, _icon, props) {
          // 重置图标样式
          props.width = '1em'
          props.height = '1em'
        },
      })
    )
    return config
  },
}

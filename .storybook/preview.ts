import type { Preview } from '@storybook/vue3'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview

import 'virtual:windi.css'
import { breakpointsAntDesign } from '@vueuse/core'

const customViewports = {}

Object.keys(breakpointsAntDesign).forEach((key) => {
  customViewports[key] = {
    name: key,
    styles: {
      width: `${breakpointsAntDesign[key]}px`,
      height: '800px',
    },
  }
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: customViewports,
  },
}

import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    lineHeight: {
      base: '1.5715',
    },
    colors: {
      primary: {
        5: '#597ef7',
        6: '#2f54eb',
        7: '#1d39c4',
      },
    },
  },
  shortcuts: {
    // Button
    'n-button': 'relative inline-block leading-base',
  },
})

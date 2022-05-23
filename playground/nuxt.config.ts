import { defineNuxtConfig } from 'nuxt'

import Module from '../'

export default defineNuxtConfig({
  modules: [Module],
  windicss: {
    analyze: true,
  },
})

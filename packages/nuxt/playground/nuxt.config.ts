export default defineNuxtConfig({
  modules: ['../src/module'],
  imports: {
    autoImport: false,
  },
  typescript: {
    includeWorkspace: true,
  },
  roshan: {
    tailwindcss: false,
  },
})

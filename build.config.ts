import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: [
    { input: './src/module', format: 'esm' },
    { input: './src/runtime/components/', outDir: './dist/runtime/components' },
  ],
  externals: ['@nuxt/schema'],
})

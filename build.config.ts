import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: [
    { input: './src/module', format: 'esm' },
    { input: './src/windicss', format: 'esm' },
    { input: './src/components/', outDir: './dist/components' },
  ],
  externals: ['@nuxt/schema'],
})

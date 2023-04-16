import { defineConfig } from 'vite'
import { defu } from 'defu'
import dts from 'vite-plugin-dts'

import { createBaseConfig } from '../base-config'
import { entry } from '../utils'

export default defineConfig(
  defu(
    {
      plugins: [
        dts({
          outputDir: 'dist/types',
          copyDtsFiles: false,
        }),
      ],
    },
    createBaseConfig(entry, 'es')
  )
)

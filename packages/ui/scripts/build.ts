import { consola } from 'consola'
import { $ } from 'execa'

import { buildStart, buildEnd } from './utils'

const build = async () => {
  try {
    buildStart()

    await Promise.all([
      $`vite build -c scripts/config/build-cjs.ts`,
      $`vite build -c scripts/config/build-iife.ts`,
      $`vite build -c scripts/config/build-es.ts`,
      $`vue-tsc --project tsconfig.dts.json`,
    ])

    buildEnd()
  } catch (error) {
    consola.error(error)
    buildStart()
  }
}

build()

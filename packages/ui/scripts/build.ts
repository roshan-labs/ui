import { consola } from 'consola'

import { run, buildStart, buildEnd } from './utils'

const build = async () => {
  try {
    buildStart()

    await Promise.all([
      run('vite build -c scripts/config/build-cjs.ts'),
      run('vite build -c scripts/config/build-iife.ts'),
      run('vite build -c scripts/config/build-es.ts'),
      run('vue-tsc --project tsconfig.dts.json'),
    ])

    buildEnd()
  } catch (error) {
    consola.error(error)
    buildStart()
  }
}

build()

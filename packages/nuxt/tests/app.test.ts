import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('Renders app.vue', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('should renders test', async () => {
    const html = await $fetch('/')

    expect(html).toContain('<div>test123</div>')
  })
})

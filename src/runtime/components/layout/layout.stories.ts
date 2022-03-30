import type { Meta, Story } from '@storybook/vue3'

import NLayout from './layout.vue'
import NLayoutHeader from './layout-header.vue'
import NLayoutContent from './layout-content.vue'
import NLayoutFooter from './layout-footer.vue'

const meta: Meta = {
  title: 'design-system/Layout',
  component: NLayout,
}

export const Default: Story = (args) => ({
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
  },
  setup: () => ({ args }),
  template: `
    <n-layout>
      <n-layout-header>Header</n-layout-header>
      <n-layout-content>Content</n-layout-content>
      <n-layout-footer>Footer</n-layout-footer>
    </n-layout>
  `,
})

export default meta

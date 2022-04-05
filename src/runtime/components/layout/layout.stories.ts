import type { Meta, Story } from '@storybook/vue3'

import NLayout from './layout.vue'
import NLayoutHeader from './layout-header.vue'
import NLayoutContent from './layout-content.vue'
import NLayoutFooter from './layout-footer.vue'

const meta: Meta = {
  title: 'design-system/布局/Layout',
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
    <n-layout class="text-center">
      <n-layout-header class="text-white bg-primary-6">Header</n-layout-header>
      <n-layout-content class="min-h-[120px] leading-[120px] text-white bg-primary-7">Content</n-layout-content>
      <n-layout-footer class="text-white bg-primary-6">Footer</n-layout-footer>
    </n-layout>
  `,
})

export default meta

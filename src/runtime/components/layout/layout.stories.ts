import type { Meta, Story } from '@storybook/vue3'

import NLayout from './layout.vue'
import NLayoutHeader from './layout-header.vue'
import NlayoutContent from './layout-content.vue'
import NlayoutFooter from './layout-footer.vue'

const meta: Meta = {
  title: 'design-system/Layout',
  component: NLayout,
}

export const Default: Story = (args) => ({
  components: {
    NLayout,
    NLayoutHeader,
    NlayoutContent,
    NlayoutFooter,
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

import type { Meta, Story } from '@storybook/vue3'

import NLayout from './layout.vue'
import NLayoutSider from './layout-sider.vue'

const meta: Meta = {
  title: 'design-system/Layout/Layout',
  component: NLayout,
}

export const Default: Story = () => ({
  components: {
    NLayout,
  },
  template: '<n-layout class="h-[200px]"></n-layout>',
})

export const WithSider: Story = () => ({
  components: {
    NLayout,
    NLayoutSider,
  },
  template: `
    <n-layout class="h-[200px] text-center">
      <n-layout-sider class="text-white leading-[200px]">Sider</n-layout-sider>
    </n-layout>
  `,
})

export default meta

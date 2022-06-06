import type { Meta, Story } from '@storybook/vue3'

import NLayout from './n-layout.vue'
import NLayoutSider from './n-layout-sider.vue'

const meta: Meta = {
  title: '设计系统/布局/布局 Layout',
  component: NLayout,
}

export const Default: Story = (args) => ({
  components: {
    NLayout,
  },
  setup: () => ({ args }),
  template: '<n-layout class="h-[200px]"></n-layout>',
})

export const WithSider: Story = (args) => ({
  components: {
    NLayout,
    NLayoutSider,
  },
  setup: () => ({ args }),
  template: `
    <n-layout class="h-[200px] text-center">
      <n-layout-sider class="text-white leading-[200px]">Sider</n-layout-sider>
    </n-layout>
  `,
})

export default meta

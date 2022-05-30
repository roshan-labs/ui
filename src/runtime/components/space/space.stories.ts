import type { Meta, Story } from '@storybook/vue3'

import NButton from '../button/button.vue'
import NSpace from './space.vue'

const meta: Meta = {
  title: '设计系统/布局/间距 Space',
  component: NSpace,
}

export const Default: Story = (args) => ({
  components: {
    NSpace,
    NButton,
  },
  setup: () => ({ args }),
  template: `
    <n-space v-bind="args">
      Space
      <n-button>Button</n-button>
      <n-button type="primary">Primary</n-button>
      <n-button type="link">Link</n-button>
    </n-space>
  `,
})

export const Size: Story = (args) => ({
  components: {
    NSpace,
    NButton,
  },
  setup: () => ({ args }),
  template: `
    <n-space v-bind="args">
      <n-button v-for="n in 5">Button</n-button>
    </n-space>
  `,
})
Size.args = {
  size: 'default',
}

export default meta

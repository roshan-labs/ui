import type { Meta, Story } from '@storybook/vue3'

import NButton from '../button/button.vue'
import NSpace from './space.vue'

const meta: Meta = {
  title: '设计系统/布局/Space 布局',
  component: NSpace,
}

export const Template: Story = (args) => ({
  components: {
    NSpace,
    NButton,
  },
  setup: () => ({ args }),
  template: `
    <n-space>
      Space
      <n-button>Button</n-button>
    </space>
  `,
})

export default meta

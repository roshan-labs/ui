import type { Meta, Story } from '@storybook/vue3'

import NButton from '../button/n-button.vue'
import NDivider from '../divider/n-divider.vue'
import NSpace from './n-space.vue'

const meta: Meta = {
  title: '设计系统/布局/间距 Space',
  component: NSpace,
  decorators: [() => ({ template: '<div class="w-1/2"><story /></div>' })],
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
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

export const Direction = Size.bind({})
Direction.args = {
  direction: 'vertical',
}

export const Wrap: Story = (args) => ({
  components: {
    NSpace,
    NButton,
  },
  setup: () => ({ args }),
  template: `
    <n-space v-bind="args">
      <n-button v-for="n in 15">Button</n-button>
    </n-space>
  `,
})
Wrap.args = {
  wrap: true,
}

export const Split: Story = (args) => ({
  components: {
    NSpace,
    NButton,
    NDivider,
  },
  setup: () => ({ args }),
  template: `
    <n-space v-bind="args">
      <template #split>
        <n-divider type="vertical" />
      </template>
      <n-button v-for="n in 5">Button</n-button>
    </n-space>
  `,
})

export default meta

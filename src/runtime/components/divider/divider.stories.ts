import type { Meta, Story } from '@storybook/vue3'

import NButton from '../button/button.vue'
import NDivider from './divider.vue'

const meta: Meta = {
  title: 'design-system/Divider',
  component: NDivider,
  decorators: [() => ({ template: '<div class="w-420px text-base"><story /></div>' })],
  argTypes: {
    type: {
      description: '水平还是垂直类型',
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    dashed: {
      description: '是否虚线',
    },
  },
}

export const Horizontal: Story = (args) => ({
  components: { NDivider },
  setup: () => ({ args }),
  template: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
    <n-divider v-bind="args">{{ args.default }}</n-divider>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
  `,
})
Horizontal.args = {
  type: 'horizontal',
}

export const Vertical: Story = (args) => ({
  components: {
    NDivider,
    NButton,
  },
  setup: () => ({ args }),
  template: `
    <span>Text</span>
    <n-divider v-bind="args">{{ args.default }}</n-divider>
    <span>Text</span>
    <n-divider v-bind="args">{{ args.default }}</n-divider>
    <span>Text</span>
  `,
})
Vertical.args = {
  type: 'vertical',
}

export const Dashed = Horizontal.bind({})
Dashed.args = {
  ...Horizontal.args,
  dashed: true,
}

export default meta

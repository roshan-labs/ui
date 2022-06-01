import type { Meta, Story } from '@storybook/vue3'

import NCard from './card.vue'

const meta: Meta = {
  title: '设计系统/数据展示/卡片 Card',
  component: NCard,
  decorators: [() => ({ template: '<div class="w-[300px]"><story /></div>' })],
}

export const Default: Story = (args) => ({
  components: { NCard },
  setup: () => ({ args }),
  template: `
    <n-card v-bind="args">{{ args.default }}</n-card>
  `,
})
Default.args = {
  default: '卡片内容',
}

export const Title = Default.bind({})
Title.args = {
  ...Default.args,
  title: '卡片标题',
}

export default meta

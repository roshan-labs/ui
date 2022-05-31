import type { Meta, Story } from '@storybook/vue3'

import NCard from './card.vue'

const meta: Meta = {
  title: '设计系统/数据展示/卡片 Card',
  component: NCard,
}

export const Default: Story = (args) => ({
  components: { NCard },
  setup: () => ({ args }),
  template: `
    <n-card v-bind="args">{{ args.default }}</n-card>
  `,
})
Default.args = {
  style: 'width: 300px',
  title: '卡片标题',
  default: '卡片内容',
}

export default meta

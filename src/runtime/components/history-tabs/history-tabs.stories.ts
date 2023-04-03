import type { Meta, StoryObj } from '@storybook/vue3'
import type { RouteLocation } from 'vue-router'

import HistoryTabs from './history-tabs.vue'

type Story = StoryObj<typeof HistoryTabs>

const meta: Meta<typeof HistoryTabs> = {
  title: '高级组件/历史记录标签 history-tabs',
  component: HistoryTabs,
  argTypes: {
    'onUpdate:modelValue': { action: 'update:model-value' },
  },
}

export default meta

export const Default: Story = {
  name: '默认',
  args: {
    modelValue: [
      { name: '首页', path: '/' },
      { name: '关于我', path: '/about' },
    ] as RouteLocation[],
  },
}

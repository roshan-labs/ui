import type { Meta, StoryObj } from '@storybook/vue3'
import type { RouteLocation } from 'vue-router'
import { setup } from '@storybook/vue3'
import { createRouter, createWebHistory } from 'vue-router'

import HistoryTabs from './history-tabs.vue'

type Story = StoryObj<typeof HistoryTabs>

const meta: Meta<typeof HistoryTabs> = {
  title: '高级组件/历史记录标签 HistoryTabs',
  component: HistoryTabs,
  tags: ['autodocs'],
  argTypes: {
    'onUpdate:modelValue': { action: 'update:model-value' },
    type: { control: 'select', options: ['', 'card', 'border-card'] },
    tabPosition: { control: 'select', options: ['top', 'right', 'left'] },
  },
  decorators: [
    (story, context) => {
      const Home = { template: '<div></div>' }
      const About = { template: '<div></div>' }

      const router = createRouter({
        history: createWebHistory(),
        routes: [
          { path: '/', name: '首页', component: Home },
          { path: '/about', name: '关于我', component: About },
        ],
      })

      setup((app) => {
        app.use(router)
        router.replace('/')
      })

      return story(context)
    },
  ],
}

export default meta

export const Default: Story = {
  name: '默认',
}

export const History: Story = {
  name: '历史记录',
  args: {
    modelValue: [
      { name: '首页', path: '/' },
      { name: '关于我', path: '/about' },
    ] as RouteLocation[],
  },
}

export const PositionRight: Story = {
  name: '在右边',
  args: {
    ...History.args,
    tabPosition: 'right',
  },
}

export const PositionLeft: Story = {
  name: '在左边',
  args: {
    ...History.args,
    tabPosition: 'left',
  },
}

export const Card: Story = {
  name: '卡片风格',
  args: {
    ...History.args,
    type: 'card',
  },
}

export const CardRight: Story = {
  name: '卡片风格在右边',
  args: {
    ...Card.args,
    ...PositionRight.args,
  },
}

export const CardLeft: Story = {
  name: '卡片风格在左边',
  args: {
    ...Card.args,
    ...PositionLeft.args,
  },
}

export const BorderCard: Story = {
  name: '线框卡片风格',
  args: {
    ...History.args,
    type: 'border-card',
  },
}

export const BorderCardRight: Story = {
  name: '线框卡片风格在右边',
  args: {
    ...BorderCard.args,
    ...PositionRight.args,
  },
}

export const BorderCardLeft: Story = {
  name: '线框卡片风格在左边',
  args: {
    ...BorderCard.args,
    ...PositionLeft.args,
  },
}

export const CustomClass: Story = {
  name: '自定义样式',
  args: {
    ...BorderCardRight.args,
    class: 'h-200px',
  },
}

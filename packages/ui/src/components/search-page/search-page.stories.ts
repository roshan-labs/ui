import type { Meta, StoryObj } from '@storybook/vue3'
import type { RouteRecordNormalized } from 'vue-router'

import SearchPage from './search-page.vue'

type Story = StoryObj<typeof SearchPage>

const meta: Meta<typeof SearchPage> = {
  title: '高级组件/查询页面 SearchPage',
  component: SearchPage,
  tags: ['autodocs'],
}

export default meta

export const Basic: Story = {
  name: '默认',
  args: {
    routes: [
      { path: '/', name: '首页' },
      { path: '/about', name: '关于我' },
    ] as RouteRecordNormalized[],
  },
}

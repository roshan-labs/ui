import type { Meta, StoryObj } from '@storybook/vue3'
import type { RouteRecordRaw } from 'vue-router'

import { vueRouter } from 'storybook-vue3-router'

import SearchPage from './search-page.vue'

type Story = StoryObj<typeof SearchPage>

const Component = { template: '' }

const routes: RouteRecordRaw[] = [
  { path: '/', name: '首页', component: Component },
  { path: '/about', name: '关于我', component: Component },
  { path: '/list', name: 'List', component: Component },
  { path: '/list-item', name: 'List Item', component: Component },
]

const meta: Meta<typeof SearchPage> = {
  title: '高级组件/查询页面 SearchPage',
  component: SearchPage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '通过关键词查询页面路由，基于 ProSelect 封装，全量属性继承，相关属性可查看 ProSelect 文档。',
      },
    },
  },
  decorators: [vueRouter(routes)],
  argTypes: {
    onChange: { action: 'change' },
  },
}

export default meta

export const Basic: Story = {
  name: '默认',
}

export const Routes: Story = {
  name: '自定义页面路由',
  args: {
    routes: routes.slice(0, 2),
  },
}

export const Disabled: Story = {
  name: '禁用',
  args: {
    disabled: true,
  },
}

export const CustomStyle: Story = {
  name: '自定义样式',
  args: {
    class: 'w-500px',
  },
}

export const Slot: Story = {
  name: '自定义选项插槽',
  render: (args) => ({
    components: { SearchPage },
    setup: () => ({ args }),
    template: `
      <search-page v-bind="args">
        <template #default="{ item }">
          <span>页面：{{ item.label }}</span>
        </template>
      </search-page>
    `,
  }),
}

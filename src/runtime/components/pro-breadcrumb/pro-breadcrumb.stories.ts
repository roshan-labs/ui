import type { Meta, StoryObj } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { markRaw } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

import ProBreadcrumb from './pro-breadcrumb.vue'

type Story = StoryObj<typeof ProBreadcrumb>

const meta: Meta<typeof ProBreadcrumb> = {
  title: '高级组件/面包屑 ProBreadcrumb',
  component: ProBreadcrumb,
  decorators: [
    (story, context) => {
      const Home = { template: '<div></div>' }
      const List = { template: '<div></div>' }
      const ListItem = { template: '<div></div>' }

      const router = createRouter({
        history: createWebHistory(),
        routes: [
          {
            path: '/',
            name: '首页',
            component: Home,
            children: [
              {
                path: 'list',
                name: '列表',
                component: List,
                children: [{ path: 'item', name: '详情', component: ListItem }],
              },
            ],
          },
        ],
      })

      setup((app) => {
        app.use(router)
        router.replace('/list/item')
      })

      return story(context)
    },
  ],
}

export default meta

export const Default: Story = {
  name: '默认',
}

export const Separator: Story = {
  name: '分隔符',
  args: {
    separator: '->',
  },
}

export const SeparatorIcon: Story = {
  name: '图标分隔符',
  args: {
    separatorIcon: markRaw(ArrowRight),
  },
}

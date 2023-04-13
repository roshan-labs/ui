import type { Meta, StoryObj } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { markRaw } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

import RouteBreadcrumb from './route-breadcrumb.vue'

type Story = StoryObj<typeof RouteBreadcrumb>

const meta: Meta<typeof RouteBreadcrumb> = {
  title: '高级组件/路由面包屑 RouteBreadcrumb',
  component: RouteBreadcrumb,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '根据当前页面路由生成面包屑导航，需要 vue-router 模块，扩展自 <a href="https://element-plus.org/zh-CN/component/breadcrumb.html" target="_blank">ElBreadcrumb</a>。',
      },
    },
  },
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

export const Basic: Story = {
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

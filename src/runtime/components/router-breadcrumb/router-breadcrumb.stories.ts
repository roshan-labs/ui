import type { Meta, Story } from '@storybook/vue3'
import vueRouter from 'storybook-vue3-router'

import { RouterBreadcrumb } from './index'

export default {
  title: '高级组件/路由面包屑 RouterBreadcrumb',
  component: RouterBreadcrumb,
} as Meta

const Home = {
  template: '<div></div>',
}

const HomeList = {
  template: '<div></div>',
}

const HomeListItem = {
  template: '<div></div>',
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'list',
        name: 'Home List',
        component: HomeList,
        children: [
          {
            path: 'item',
            name: 'Home Item',
            component: HomeListItem,
          },
        ],
      },
    ],
  },
]

const Template: Story = (args) => ({
  components: { RouterBreadcrumb },
  setup: () => ({ args }),
  template: '<router-breadcrumb v-bind="args" />',
})

export const Default = Template.bind({})
Default.decorators = [vueRouter(routes, { initialRoute: '/list/item' })]
Default.storyName = '默认'

import type { Meta, Story } from '@storybook/vue3'

import NLayout from './layout.vue'
import NLayoutHeader from './layout-header.vue'
import NLayoutSider from './layout-sider.vue'
import NLayoutContent from './layout-content.vue'
import NLayoutFooter from './layout-footer.vue'
import IconBars from '~icons/ant-design/bars-outlined'

const meta: Meta = {
  title: '设计系统/布局/布局边栏 LayoutSider',
  component: NLayoutSider,
  argTypes: {
    // Events
    onUpdateCollapsed: {
      action: 'update-collapsed',
    },
    onBreakpoint: {
      description: '触发响应式布局断点时的回调',
      action: 'breakpoint',
    },
  },
}

const components = {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  IconBars,
}

export const Default: Story = (args) => ({
  components,
  setup: () => ({ args }),
  template: `
    <n-layout class="text-center">
      <n-layout-header class="text-white bg-primary-5">Header</n-layout-header>
      <n-layout>
        <n-layout-sider class="text-white bg-primary-6 leading-[120px]" v-bind="args" @update:collapsed="args.onUpdateCollapsed">Sider</n-layout-sider>
        <n-layout-content class="min-h-[120px] leading-[120px] text-white bg-primary-7">Content</n-layout-content>
      </n-layout>
      <n-layout-footer class="text-white bg-primary-5">Footer</n-layout-footer>
    </n-layout>
  `,
})

export const Right: Story = (args) => ({
  components,
  setup: () => ({ args }),
  template: `
    <n-layout class="text-center">
      <n-layout-header class="text-white bg-primary-5">Header</n-layout-header>
      <n-layout>
        <n-layout-content class="min-h-[120px] leading-[120px] text-white bg-primary-7">Content</n-layout-content>
        <n-layout-sider class="text-white bg-primary-6 leading-[120px]" v-bind="args" @update:collapsed="args.onUpdateCollapsed">Sider</n-layout-sider>
      </n-layout>
      <n-layout-footer class="text-white bg-primary-5">Footer</n-layout-footer>
    </n-layout>
  `,
})

export const Collapsed = Default.bind({})
Collapsed.args = {
  collapsed: true,
}

export const Collapsible = Default.bind({})
Collapsible.args = {
  collapsible: true,
}

export const DefaultCollapsed = Default.bind({})
DefaultCollapsed.args = {
  collapsed: undefined,
  defaultCollapsed: true,
}

export const ReverseArrow = Right.bind({})
ReverseArrow.args = {
  collapsible: true,
  reverseArrow: true,
}

export const CustomTrigger: Story = (args) => ({
  components,
  setup: () => ({ args }),
  template: `
    <n-layout class="text-center">
      <n-layout-header class="text-white bg-primary-5">Header</n-layout-header>
      <n-layout>
        <n-layout-sider class="text-white bg-primary-6 leading-[120px]" v-bind="args" @update:collapsed="args.onUpdateCollapsed">
          <template #trigger>
            <icon-bars />
          </template>
          <span>Sider</span>
        </n-layout-sider>
        <n-layout-content class="min-h-[120px] leading-[120px] text-white bg-primary-7">Content</n-layout-content>
      </n-layout>
      <n-layout-footer class="text-white bg-primary-5">Footer</n-layout-footer>
    </n-layout>
  `,
})
CustomTrigger.args = {
  collapsible: true,
}

export const Breakpoint = Default.bind({})
Breakpoint.args = {
  breakpoint: 'lg',
}
Breakpoint.parameters = {
  viewport: {
    defaultViewport: 'md',
  },
}

export default meta

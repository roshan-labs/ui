import type { Meta, Story } from '@storybook/vue3'

import NDivider from './divider.vue'

const meta: Meta = {
  title: 'design-system/布局/Divider',
  component: NDivider,
  decorators: [() => ({ template: '<div class="w-420px text-base"><story /></div>' })],
  argTypes: {
    default: {
      description: '默认插槽',
    },
    type: {
      description: '水平还是垂直类型',
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    dashed: {
      description: '是否虚线',
      control: 'boolean',
    },
    orientation: {
      description: '分割线标题的位置',
      control: 'select',
      options: ['left', 'right', 'center'],
    },
    orientationMargin: {
      description:
        '标题和最近 left/right 边框之间的距离，去除了分割线，同时 orientation 必须为 left 或 right',
      control: 'number',
    },
    plain: {
      description: '文字是否显示为普通正文样式',
      control: 'boolean',
    },
  },
}

export const Horizontal: Story = (args) => ({
  components: { NDivider },
  setup: () => ({ args }),
  template: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
    <n-divider v-bind="args">{{ args.default }}</n-divider>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
  `,
})
Horizontal.args = {
  type: 'horizontal',
}

export const Vertical: Story = (args) => ({
  components: { NDivider },
  setup: () => ({ args }),
  template: `
    <span>Text</span>
    <n-divider v-bind="args" />
    <span>Text</span>
    <n-divider v-bind="args" />
    <span>Text</span>
  `,
})
Vertical.args = {
  type: 'vertical',
}

export const Dashed = Horizontal.bind({})
Dashed.args = {
  ...Horizontal.args,
  dashed: true,
}

export const Orientation = Horizontal.bind({})
Orientation.args = {
  ...Horizontal.args,
  orientation: 'center',
  default: 'Text',
}

export const OrientationMargin = Orientation.bind({})
OrientationMargin.args = {
  ...Orientation.args,
  orientation: 'left',
  orientationMargin: 0,
}

export const Plain = Horizontal.bind({})
Plain.args = {
  ...Horizontal.args,
  plain: true,
  default: 'Text',
}

export default meta

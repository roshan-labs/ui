import type { Meta, Story } from '@storybook/vue3'

import NIcon from './icon.vue'
import IconAntDesign from '~icons/ant-design/ant-design-outlined'
import IconSmileTwotone from '~icons/ant-design/smile-twotone'

const meta: Meta = {
  title: 'design-system/icon',
  component: NIcon,
  argTypes: {
    color: {
      description: '颜色',
      control: 'color',
    },
    size: {
      description: '尺寸',
      control: 'text',
    },
    onClick: {
      description: '点击按钮时的回调',
      action: 'click',
    },
  },
}

const Template: Story = (args) => ({
  components: {
    NIcon,
    IconAntDesign,
    IconSmileTwotone,
  },
  setup: () => ({ args }),
  template: `
    <n-icon v-bind="args">
      <icon-ant-design />
    </n-icon>
  `,
})

export const Default = Template.bind({})

export default meta

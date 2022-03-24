import type { Meta, Story } from '@storybook/vue3'

import NAvatar from './avatar.vue'

const meta: Meta = {
  title: 'design-system/Avatar',
  component: NAvatar,
  argTypes: {
    src: {
      description: '图片类头像的资源地址',
    },
    srcSet: {
      description: '设置图片类头像响应式资源地址',
    },
    alt: {
      description: '图像无法显示时的替代文本',
    },
  },
}

const Template: Story = (args) => ({
  components: { NAvatar },
  setup: () => ({ args }),
  template: '<n-avatar v-bind="args"></n-avatar>',
})

export const Default = Template.bind({})
Default.args = {
  src: 'https://joeschmoe.io/api/v1/random',
  alt: 'User avatar',
}

export default meta

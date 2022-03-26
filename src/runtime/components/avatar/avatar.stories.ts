import type { Meta, Story } from '@storybook/vue3'

import NAvatar from './avatar.vue'
import IconUserOutlined from '~icons/ant-design/user-outlined'

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
    shape: {
      description: '指定头像的形状',
      control: 'select',
      options: ['circle', 'square'],
    },
  },
}

const Template: Story = (args) => ({
  components: { NAvatar },
  setup: () => ({ args }),
  template: '<n-avatar v-bind="args"></n-avatar>',
})

export const Image = Template.bind({})
Image.args = {
  src: 'https://joeschmoe.io/api/v1/random',
  alt: 'User avatar',
}

export const Icon: Story = (args) => ({
  components: {
    NAvatar,
    IconUserOutlined,
  },
  setup: () => ({ args }),
  template: `
    <n-avatar v-bind="args">
      <template #icon>
        <icon-user-outlined />
      </template>
    </n-avatar>
  `,
})

export const Shape = Template.bind({})
Shape.args = {
  ...Image.args,
  shape: 'square',
}

export default meta

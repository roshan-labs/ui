import type { Meta, Story } from '@storybook/vue3'

import NAvatar from './avatar.vue'
import IconUserOutlined from '~icons/ant-design/user-outlined'

const meta: Meta = {
  title: '设计系统/数据展示/头像 Avatar',
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
    icon: {
      description: '设置头像的自定义图标',
    },
    shape: {
      description: '指定头像的形状',
      control: 'select',
      options: ['circle', 'square'],
    },
    gap: {
      description: '字符类型距离左右两侧边界单位像素',
      control: 'number',
    },
    size: {
      description: '设置头像的大小',
      control: 'select',
      options: ['small', 'default', 'large'],
    },
    onError: {
      description: '图片加载失败的事件',
      action: 'error',
    },
  },
}

const Template: Story = (args) => ({
  components: { NAvatar },
  setup: () => ({ args }),
  template: '<n-avatar v-bind="args">{{ args.default }}</n-avatar>',
})

export const Image = Template.bind({})
Image.args = {
  src: 'https://joeschmoe.io/api/v1/jess',
  alt: 'User avatar',
}

export const Fallback = Template.bind({})
Fallback.args = {
  src: 'https://empty',
  icon: IconUserOutlined,
  default: 'USER',
}

export const IconSlot: Story = (args) => ({
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

export const Icon = Template.bind({})
Icon.args = {
  icon: IconUserOutlined,
}

export const Shape = Template.bind({})
Shape.args = {
  shape: 'square',
  default: 'U',
}

export const Text: Story = (args) => ({
  components: { NAvatar },
  setup: () => ({ args }),
  template: `
    <div class="children:mr-[8px]">
      <n-avatar>U</n-avatar>
      <n-avatar>USER</n-avatar>
    </div>
  `,
})

export const Style = Template.bind({})
Style.args = {
  style: 'color: #f56a00; background-color: #fde3cf',
  default: 'U',
}

export const Size: Story = (args) => ({
  components: {
    NAvatar,
    IconUserOutlined,
  },
  setup: () => ({ args }),
  template: `
    <div class="children:mr-[8px]">
      <n-avatar size="large">
        <template #icon>
          <icon-user-outlined />
        </template>
      </n-avatar>
      <n-avatar>
        <template #icon>
          <icon-user-outlined />
        </template>
      </n-avatar>
      <n-avatar size="small">
        <template #icon>
          <icon-user-outlined />
        </template>
      </n-avatar>
    </div>
  `,
})

export default meta

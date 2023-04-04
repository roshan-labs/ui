import type { Meta, StoryObj } from '@storybook/vue3'

import ProDescriptions from './pro-descriptions.vue'

type Story = StoryObj<typeof ProDescriptions>

const meta: Meta<typeof ProDescriptions> = {
  title: '高级组件/描述列表 ProDescriptions',
  component: ProDescriptions,
}

export default meta

export const Default: Story = {
  name: '默认',
}

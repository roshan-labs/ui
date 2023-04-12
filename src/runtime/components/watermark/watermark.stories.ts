import type { Meta, StoryObj } from '@storybook/vue3'

import type { WatermarkFont } from './types'
import Watermark from './watermark.vue'

type Story = StoryObj<typeof Watermark>

const meta: Meta<typeof Watermark> = {
  title: '扩展组件/水印 Watermark',
  component: Watermark,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Content: Story = {
  name: '文字水印',
  render: (args) => ({
    components: { Watermark },
    setup: () => ({ args }),
    template: `
      <watermark v-bind="args">
        <template v-if="args.default" #default>${args.default}</template>
      </watermark>
    `,
  }),
}
Content.args = {
  content: '嘿！我是水印',
  default: '<div class="h-screen"></div>',
}

export const Rotate: Story = {
  name: '旋转角度',
  render: Content.render,
  args: {
    ...Content.args,
    rotate: 22,
  },
}

export const Gap: Story = {
  name: '水印间距',
  render: Content.render,
  args: {
    ...Content.args,
    gap: [50, 50],
  },
}

export const Font: Story = {
  name: '自定义水印字体',
  render: Content.render,
  args: {
    ...Content.args,
    font: {
      color: '#b3e19d',
      fontFamily: 'serif',
      fontSize: 14,
      fontWeight: 'bolder',
      fontStyle: 'italic',
    } as WatermarkFont,
  },
}

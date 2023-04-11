import type { Meta, Story } from '@storybook/vue3'

import type { WatermarkFont } from './types'
import { Watermark } from './index'

export default {
  title: '扩展组件/水印 Watermark',
  component: Watermark,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta

export const Content: Story = (args) => ({
  components: { Watermark },
  setup: () => ({ args }),
  template: `
    <watermark v-bind="args">
      <div class="h-screen"></div>
    </watermark>
  `,
})
Content.args = {
  content: '嘿！我是水印',
}
Content.storyName = '文字水印'

export const Rotate = Content.bind({})
Rotate.args = {
  ...Content.args,
  rotate: 22,
}
Rotate.storyName = '旋转角度'

export const Gap = Content.bind({})
Gap.args = {
  ...Content.args,
  gap: [50, 50],
}
Gap.storyName = '水印间距'

export const Font = Content.bind({})
Font.args = {
  ...Content.args,
  font: {
    color: '#b3e19d',
    fontFamily: 'serif',
    fontSize: 14,
    fontWeight: 'bolder',
    fontStyle: 'italic',
  } as WatermarkFont,
}
Font.storyName = '自定义水印字体'

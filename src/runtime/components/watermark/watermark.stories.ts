import type { Meta, Story } from '@storybook/vue3'

import { Watermark } from './index'

export default {
  title: '扩展组件/水印 Watermark',
  component: Watermark,
} as Meta

export const Content: Story = (args) => ({
  components: { Watermark },
  setup: () => ({ args }),
  template: `
    <watermark v-bind="args">
      <div style="height: 300px"></div>
    </watermark>
  `,
})
Content.args = {
  content: '我是大魔王',
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
  rotate: 0,
  gap: [50, 10],
}
Gap.storyName = '水印间距'

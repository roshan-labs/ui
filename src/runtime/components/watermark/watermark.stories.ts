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
      <div style="width: 128px;height: 300px;font-size: 16px">我是水印我是水印</div>
    </watermark>
  `,
})
Content.args = {
  content: '我',
  rotate: 0,
  gap: [0, 0],
}
Content.storyName = '文字水印'

export const Rotate = Content.bind({})
Rotate.args = {
  ...Content.args,
  rotate: 22,
}
Rotate.storyName = '旋转角度'

export const Size = Content.bind({})
Size.args = {
  ...Content.args,
  width: 200,
  height: 200,
}
Size.storyName = '尺寸'

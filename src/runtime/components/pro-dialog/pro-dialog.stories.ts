import type { Meta, Story } from '@storybook/vue3'

import type { ProDialogBeforeConfirm } from './types'
import { ProDialog } from './index'

export default {
  title: '高级组件/对话框 ProDialog',
  component: ProDialog,
  argTypes: {
    onOpen: { action: 'open' },
    onOpened: { action: 'opened' },
    onClose: { action: 'close' },
    onClosed: { action: 'closed' },
    onCancel: { action: 'cancel' },
    onConfirm: { action: 'confirm' },
  },
} as Meta

const Template: Story = (args) => ({
  components: { ProDialog },
  setup: () => ({ args }),
  template: `
    <pro-dialog v-bind="args">
      {{ args.default }}
    </pro-dialog>
  `,
})

export const Default = Template.bind({})
Default.args = {
  modelValue: true,
  default: '这是一个高级对话框',
}
Default.storyName = '默认'

export const Title = Template.bind({})
Title.args = {
  ...Default.args,
  title: '我是一个对话框标题',
}
Title.storyName = '带标题对话框'

export const CustomAction = Template.bind({})
CustomAction.args = {
  ...Default.args,
  confirmText: '提交',
  cancelText: '关闭',
}
CustomAction.storyName = '自定义按钮'

export const Fullscreen = Template.bind({})
Fullscreen.args = {
  ...Default.args,
  title: '我是一个全屏对话框',
  fullscreen: true,
}
Fullscreen.storyName = '全屏'

export const BeforeConfirm = Template.bind({})
BeforeConfirm.args = {
  ...Default.args,
  beforeConfirm: ((loading, done) => {
    loading.value = true

    window.setTimeout(() => {
      loading.value = false
      done()
    }, 2000)
  }) as ProDialogBeforeConfirm,
}
BeforeConfirm.storyName = '提交前的回调'

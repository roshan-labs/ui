import type { Meta, Story } from '@storybook/vue3'

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
  title: '标题',
  default: '这是一个对话框',
}

export const CancelText = Template.bind({})
CancelText.args = {
  ...Default.args,
  cancelText: '关闭',
}

export const ConfirmText = Template.bind({})
ConfirmText.args = {
  ...Default.args,
  confirmText: '提交',
}

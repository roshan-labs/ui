import type { Meta, StoryObj } from '@storybook/vue3'

import type { ProDialogBeforeConfirm } from './types'
import ProDialog from './pro-dialog.vue'

type Story = StoryObj<typeof ProDialog>

const meta: Meta<typeof ProDialog> = {
  title: '高级组件/对话框 ProDialog',
  component: ProDialog,
  tags: ['autodocs'],
  argTypes: {
    onOpen: { action: 'open' },
    onOpened: { action: 'opened' },
    onClose: { action: 'close' },
    onClosed: { action: 'closed' },
    onCancel: { action: 'cancel' },
    onConfirm: { action: 'confirm' },
  },
}

export default meta

export const Basic: Story = {
  name: '默认',
  args: {
    modelValue: true,
    default: '这是一个高级对话框',
  },
}

export const Title: Story = {
  name: '带标题对话框',
  args: {
    ...Basic.args,
    title: '我是一个对话框标题',
  },
}

export const CustomAction: Story = {
  name: '自定义按钮',
  args: {
    ...Basic.args,
    confirmText: '提交',
    cancelText: '关闭',
  },
}

export const Fullscreen: Story = {
  name: '全屏',
  args: {
    ...Basic.args,
    title: '我是一个全屏对话框',
    fullscreen: true,
  },
}

export const BeforeConfirm: Story = {
  name: '提交前的回调',
  args: {
    ...Basic.args,
    beforeConfirm: ((loading, done) => {
      loading.value = true

      window.setTimeout(() => {
        loading.value = false
        done()
      }, 2000)
    }) as ProDialogBeforeConfirm,
  },
}

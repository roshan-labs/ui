import type { Meta, StoryObj } from '@storybook/vue3'

import type { ProRadioOption } from './types'
import ProRadio from './pro-radio.vue'

type Story = StoryObj<typeof ProRadio>

const meta: Meta<typeof ProRadio> = {
  title: '高级组件/单选框 ProRadio',
  component: ProRadio,
  argTypes: {
    onInput: { action: 'input' },
    type: {
      control: { type: 'select' },
      options: ['default', 'button', 'border'],
    },
  },
}

export default meta

export const Default: Story = {
  name: '默认',
  args: {
    options: [
      { value: '0', label: 'Option1' },
      { value: '1', label: 'Option2' },
    ] as ProRadioOption[],
  },
}

export const Disabled: Story = {
  name: '禁用',
  args: {
    ...Default.args,
    disabled: true,
  },
}

export const OptionDisabled: Story = {
  name: '选项禁用',
  args: {
    options: [
      { value: '0', label: 'Option1', disabled: true },
      { value: '1', label: 'Option2' },
    ] as ProRadioOption[],
  },
}

export const Selected: Story = {
  name: '默认值',
  args: {
    ...Default.args,
    modelValue: '0',
  },
}

export const RadioButton: Story = {
  name: '按钮模式',
  args: {
    ...Selected.args,
    type: 'button',
  },
}

export const BorderRadio: Story = {
  name: '线框模式',
  args: {
    ...Selected.args,
    type: 'border',
  },
}

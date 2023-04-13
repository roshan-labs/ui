import type { Meta, StoryObj } from '@storybook/vue3'

import type { ProRadioOption } from './types'
import ProRadio from './pro-radio.vue'

type Story = StoryObj<typeof ProRadio>

const meta: Meta<typeof ProRadio> = {
  title: '高级组件/单选框 ProRadio',
  component: ProRadio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '通过数据配置化生成单选框，扩展自 <a href="https://element-plus.org/zh-CN/component/radio.html" target="_blank">ElRadio</a>。',
      },
    },
  },
  argTypes: {
    onInput: { action: 'input' },
    type: {
      control: { type: 'select' },
      options: ['default', 'button', 'border'],
    },
  },
}

export default meta

export const Basic: Story = {
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
    ...Basic.args,
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
    ...Basic.args,
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

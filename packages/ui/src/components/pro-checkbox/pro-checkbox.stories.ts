import type { Meta, StoryObj } from '@storybook/vue3'

import type { ProCheckboxOption } from './types'
import ProCheckbox from './pro-checkbox.vue'

type Story = StoryObj<typeof ProCheckbox>

const meta: Meta<typeof ProCheckbox> = {
  title: '高级组件/多选框 ProCheckbox',
  component: ProCheckbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '通过数据配置化生成多选框，扩展自 <a href="https://element-plus.org/zh-CN/component/checkbox.html" target="_blank">ElCheckbox</a>。',
      },
    },
  },
  argTypes: {
    'onUpdate:modelValue': { action: 'update:model-value' },
    onChange: { action: 'change' },
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
    type: 'default',
    options: [
      { value: '0', label: '选项1' },
      { value: '1', label: '选项2' },
      { value: '2', label: '选项3' },
    ] as ProCheckboxOption[],
  },
}

export const Checked: Story = {
  name: '默认选中',
  args: {
    ...Basic.args,
    modelValue: ['0', '1'],
  },
}

export const Disabled: Story = {
  name: '禁用',
  args: {
    ...Checked.args,
    disabled: true,
  },
}

export const OptionDisabled: Story = {
  name: '选项禁用',
  args: {
    options: [
      { value: '0', label: '选项1', disabled: true },
      { value: '1', label: '选项2' },
    ] as ProCheckboxOption[],
  },
}

export const CheckboxButton: Story = {
  name: '按钮类型',
  args: {
    ...Checked.args,
    type: 'button',
  },
}

export const CheckboxBorder: Story = {
  name: '线框类型',
  args: {
    ...Basic.args,
    type: 'border',
  },
}

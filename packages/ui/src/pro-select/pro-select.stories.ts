import type { Meta, StoryObj } from '@storybook/vue3'

import type { ProSelectOption } from './types'
import ProSelect from './pro-select.vue'

type Story = StoryObj<typeof ProSelect>

const meta: Meta<typeof ProSelect> = {
  title: '高级组件/选择器 ProSelect',
  component: ProSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '通过数据配置化生成选择器，扩展自 <a href="https://element-plus.org/zh-CN/component/select.html" target="_blank">ElSelect</a>。',
      },
    },
  },
  argTypes: {
    'onUpdate:modelValue': { event: 'update:model-value' },
    onChange: { event: 'change' },
    onVisibleChange: { event: 'visible-change' },
    onRemoveTag: { event: 'remove-tag' },
    onClear: { event: 'clear' },
    onBlur: { event: 'blur' },
    onFocus: { event: 'focus' },
  },
}

export default meta

export const Basic: Story = {
  name: '默认',
  args: {
    options: [
      { value: '0', label: '选项1' },
      { value: '1', label: '选项2' },
    ] as ProSelectOption[],
  },
}

export const Selected: Story = {
  name: '默认选中',
  args: {
    ...Basic.args,
    modelValue: '0',
  },
}

export const DisabledOption: Story = {
  name: '选项禁用',
  args: {
    options: [
      { value: '0', label: '选项1', disabled: true },
      { value: '1', label: '选项2' },
    ] as ProSelectOption[],
  },
}

export const Group: Story = {
  name: '选项分组',
  args: {
    options: [
      {
        label: '团队',
        group: [
          { value: '0', label: '小甲' },
          { value: '1', label: '小乙' },
        ],
      },
      { label: '个人', group: [{ value: '2', label: '小丁' }] },
    ] as ProSelectOption[],
  },
}

import type { Meta, StoryObj } from '@storybook/vue3'

import type { ProSelectOption } from './types'
import ProSelect from './pro-select.vue'

type Story = StoryObj<typeof ProSelect>

const meta: Meta<typeof ProSelect> = {
  component: ProSelect,
  title: '高级组件/选择器 ProSelect',
  tags: ['autodocs'],
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

export const Default: Story = {
  name: '',
}
Default.args = {
  options: [
    { value: '0', label: '选项1' },
    { value: '1', label: '选项2' },
  ] as ProSelectOption[],
}
Default.storyName = '默认'

export const Selected = Template.bind({})
Selected.args = {
  ...Default.args,
  modelValue: '0',
}
Selected.storyName = '默认选中'

export const DisabledOption = Template.bind({})
DisabledOption.args = {
  options: [
    { value: '0', label: '选项1', disabled: true },
    { value: '1', label: '选项2' },
  ] as ProSelectOption[],
}
DisabledOption.storyName = '选项禁用'

export const Group = Template.bind({})
Group.args = {
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
}
Group.storyName = '选项分组'

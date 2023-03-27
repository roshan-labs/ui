import type { Meta, Story } from '@storybook/vue3'

import type { ProCheckboxOption } from './types'
import { ProCheckbox } from './index'

export default {
  title: '高级组件/多选框 ProCheckbox',
  component: ProCheckbox,
  argTypes: {
    'onUpdate:modelValue': { action: 'update:model-value' },
    onChange: { action: 'change' },
    onInput: { action: 'input' },
    type: {
      control: { type: 'select' },
      options: ['default', 'button', 'border'],
    },
  },
} as Meta

const Template: Story = (args) => ({
  components: { ProCheckbox },
  setup: () => ({ args }),
  template: '<pro-checkbox v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
  options: [
    { value: '0', label: '选项1' },
    { value: '1', label: '选项2' },
    { value: '2', label: '选项3' },
  ] as ProCheckboxOption[],
}
Default.storyName = '默认'

export const Checked = Template.bind({})
Checked.args = {
  ...Default.args,
  modelValue: ['0', '1'],
}
Checked.storyName = '默认选中'

export const Disabled = Template.bind({})
Disabled.args = {
  ...Checked.args,
  disabled: true,
}
Disabled.storyName = '禁用'

export const OptionDisabled = Template.bind({})
OptionDisabled.args = {
  options: [
    { value: '0', label: '选项1', disabled: true },
    { value: '1', label: '选项2' },
  ] as ProCheckboxOption[],
}
OptionDisabled.storyName = '选项禁用'

export const CheckboxButton = Template.bind({})
CheckboxButton.args = {
  ...Checked.args,
  type: 'button',
}
CheckboxButton.storyName = '按钮类型'

export const CheckboxBorder = Template.bind({})
CheckboxBorder.args = {
  ...Default.args,
  type: 'border',
}
CheckboxBorder.storyName = '线框类型'

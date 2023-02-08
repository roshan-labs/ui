import type { Meta, Story } from '@storybook/vue3'

import type { ProCheckboxOption } from './types'
import { ProCheckbox } from './index'

export default {
  title: '高级组件/多选框 ProCheckbox',
  component: ProCheckbox,
  argTypes: {
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

export const Checked = Template.bind({})
Checked.args = {
  ...Default.args,
  modelValue: ['0', '1'],
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Checked.args,
  disabled: true,
}

export const OptionDisabled = Template.bind({})
OptionDisabled.args = {
  options: [
    { value: '0', label: '选项1', disabled: true },
    { value: '1', label: '选项2' },
  ] as ProCheckboxOption[],
}

export const CheckboxButton = Template.bind({})
CheckboxButton.args = {
  ...Checked.args,
  type: 'button',
}

export const CheckboxBorder = Template.bind({})
CheckboxBorder.args = {
  ...Default.args,
  type: 'border',
}

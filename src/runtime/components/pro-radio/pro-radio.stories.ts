import type { Meta, Story } from '@storybook/vue3'

import type { RadioOption } from './types'
import { ProRadio } from '.'

export default {
  title: '高级组件/ProRadio',
  component: ProRadio,
  argTypes: {
    onInput: { action: 'input' },
    type: {
      control: { type: 'select' },
      options: ['default', 'button', 'border'],
    },
  },
} as Meta

const Template: Story = (args) => ({
  components: { ProRadio },
  setup: () => ({ args }),
  template: '<pro-radio v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
  options: [
    { value: '0', label: 'Option1' },
    { value: '1', label: 'Option2' },
  ] as RadioOption[],
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  disabled: true,
}

export const OptionDisabled = Template.bind({})
OptionDisabled.args = {
  options: [
    { value: '0', label: 'Option1', disabled: true },
    { value: '1', label: 'Option2' },
  ] as RadioOption[],
}

export const Selected = Template.bind({})
Selected.args = {
  ...Default.args,
  modelValue: '0',
}

export const RadioButton = Template.bind({})
RadioButton.args = {
  ...Selected.args,
  type: 'button',
}

export const BorderRadio = Template.bind({})
BorderRadio.args = {
  ...Selected.args,
  type: 'border',
}

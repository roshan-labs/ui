import type { Meta, Story } from '@storybook/vue3'

import NInput from './input.vue'

const meta: Meta = {
  title: 'design-system/Data-Entry/Input',
  component: NInput,
  decorators: [() => ({ template: '<div class="w-[220px]"><story /></div>' })],
  argTypes: {
    'onUpdate:modelValue': { action: 'update:modelValue' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
  },
}

const Template: Story = (args) => ({
  components: { NInput },
  setup: () => ({ args }),
  template: '<n-input v-bind="args" />',
})

export const Default = Template.bind({})

export const Placeholder = Template.bind({})
Placeholder.args = {
  placeholder: 'Please input',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  placeholder: 'Small size',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  placeholder: 'Large size',
}

export const Textarea = Template.bind({})
Textarea.args = {
  type: 'textarea',
  placeholder: 'Please input',
}

export const Rows = Template.bind({})
Rows.args = {
  ...Textarea.args,
  rows: 5,
}

export const AllowClear: Story = (args) => ({
  components: { NInput },
  setup: () => ({ args }),
  template: `
    <n-input class="mb-[8px]" v-bind="args" type="text" />
    <n-input v-bind="args" type="textarea" />
  `,
})
AllowClear.args = {
  modelValue: 'default value',
  placeholder: 'Please input',
  allowClear: true,
}

export default meta

import type { Meta, Story } from '@storybook/vue3'

import NInputTextarea from './input-textarea.vue'

const meta: Meta = {
  title: 'DESIGN-SYSTEM/DATA-ENTRY/InputTextarea',
  component: NInputTextarea,
  decorators: [() => ({ template: '<div class="w-[260px]"><story /></div>' })],
  argTypes: {
    'onUpdate:modelValue': { action: 'update:modelValue' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
  },
}

const Template: Story = (args) => ({
  components: { NInputTextarea },
  setup: () => ({ args }),
  template: '<n-input-textarea v-bind="args" />',
})

export const Default = Template.bind({})

export const Placeholder = Template.bind({})
Placeholder.args = {
  placeholder: 'Please input',
}

export const Rows = Template.bind({})
Rows.args = {
  ...Placeholder.args,
  rows: 5,
}

export const AllowClear = Template.bind({})
AllowClear.args = {
  ...Placeholder.args,
  modelValue: 'Textarea value',
  allowClear: true,
}

export const Borderless = Template.bind({})
Borderless.args = {
  ...Placeholder.args,
  bordered: false,
}

export const Maxlength = Template.bind({})
Maxlength.args = {
  maxlength: 10,
}

export const ShowCount = Template.bind({})
ShowCount.args = {
  maxlength: 10,
  showCount: true,
  class: 'test',
}

export const AutoSize = Template.bind({})
AutoSize.args = {
  autoSize: true,
}

export default meta

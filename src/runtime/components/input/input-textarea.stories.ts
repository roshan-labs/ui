import type { Meta, Story } from '@storybook/vue3'

import NInputTextarea from './input-textarea.vue'

const meta: Meta = {
  title: 'DESIGN-SYSTEM/DATA-ENTRY/InputTextarea',
  component: NInputTextarea,
  decorators: [() => ({ template: '<div class="w-[320px]"><story /></div>' })],
  argTypes: {
    'onUpdate:modelValue': { action: 'update:modelValue' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
    onEnter: { action: 'enter' },
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
}

export const Autosize: Story = () => ({
  components: { NInputTextarea },
  template: `
    <div>
      <n-input-textarea class="mb-md" placeholder="Autosize: true" autosize />
      <n-input-textarea placeholder="Autosize: { minRows: 2, maxRows: 6 }" :autosize="{ minRows: 2, maxRows: 6 }" />
    </div>
  `,
})
Autosize.parameters = {
  controls: { disable: true },
}

export const Error = Template.bind({})
Error.args = {
  status: 'error',
  placeholder: 'Error textarea',
}

export default meta

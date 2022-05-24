import type { Meta, Story } from '@storybook/vue3'

import NInput from './input.vue'

const meta: Meta = {
  title: 'design-system/DATA-ENTRY/Input',
  component: NInput,
  decorators: [() => ({ template: '<div class="w-[260px]"><story /></div>' })],
  argTypes: {
    'onUpdate:modelValue': { action: 'update:modelValue' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
    status: {
      control: { type: 'select' },
      options: ['error', 'warning'],
    },
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

export const AllowClear = Template.bind({})
AllowClear.args = {
  modelValue: 'default value',
  placeholder: 'Please input',
  allowClear: true,
}

export const Error: Story = (args) => ({
  components: { NInput },
  setup: () => ({ args }),
  template: `
    <div>
      <n-input v-bind="args" />
    </div>
  `,
})
Error.args = {
  status: 'error',
  placeholder: 'Error input',
}

export const Warning = Error.bind({})
Warning.args = {
  status: 'warning',
  placeholder: 'Warning input',
}

export const AddonBefore = Template.bind({})
AddonBefore.args = {
  addonBefore: 'https://',
}

export const AddonAfter = Template.bind({})
AddonAfter.args = {
  addonAfter: '.com',
}

export const Borderless = Template.bind({})
Borderless.args = {
  bordered: false,
  placeholder: 'Borderless',
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Placeholder.args,
  disabled: true,
}

export default meta

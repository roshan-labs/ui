import type { Meta, Story } from '@storybook/vue3'

import NInputTextarea from './n-input-textarea.vue'

const meta: Meta = {
  title: '设计系统/数据录入/文本域 InputTextarea',
  component: NInputTextarea,
  decorators: [() => ({ template: '<div class="w-[320px]"><story /></div>' })],
  argTypes: {
    'onUpdate:modelValue': { action: 'update:modelValue' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
    onEnter: { action: 'enter' },
    status: {
      control: { type: 'select' },
      options: ['error', 'warning'],
    },
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
  placeholder: '请输入',
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

export const Error = Template.bind({})
Error.args = {
  status: 'error',
  placeholder: '它出错了',
}

export const Warning = Template.bind({})
Warning.args = {
  status: 'warning',
  placeholder: '它告警了',
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Placeholder.args,
  disabled: true,
}

export const Borderless = Template.bind({})
Borderless.args = {
  bordered: false,
  placeholder: 'Borderless',
}

export const Maxlength = Template.bind({})
Maxlength.args = {
  maxlength: 10,
}

export const ShowCount: Story = (args) => ({
  components: { NInputTextarea },
  setup: () => ({ args }),
  template: `
    <n-input-textarea class="mb-xs" v-bind="args" />
    <n-input-textarea v-bind="args" :maxlength="50" />
  `,
})
ShowCount.args = {
  ...Placeholder.args,
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

export default meta

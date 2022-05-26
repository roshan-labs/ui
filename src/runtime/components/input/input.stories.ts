import type { Meta, Story } from '@storybook/vue3'

import NIcon from '../icon/icon.vue'
import NInput from './input.vue'
import UserIcon from '~icons/ant-design/user-outlined'
import InfoIcon from '~icons/ant-design/info-circle-outlined'

const meta: Meta = {
  title: '设计系统/数据录入/输入框 Input',
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

export const PrefixAndSufix: Story = () => ({
  components: {
    NInput,
    NIcon,
    UserIcon,
    InfoIcon,
  },
  template: `
    <div>
      <n-input class="mb-xs" prefix="¥" sufix="RMB" />
      <n-input>
        <template #prefix>
          <n-icon><user-icon /></n-icon>
        </template>
        <template #sufix>
          <n-icon><info-icon /></n-icon>
        </template>
      </n-input>
    </div>
  `,
})

export default meta

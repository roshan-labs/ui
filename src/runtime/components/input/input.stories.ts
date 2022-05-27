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
  placeholder: '请输入',
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

export const Password = Template.bind({})
Password.args = {
  type: 'password',
  modelValue: '123456',
}

export const AllowClear = Template.bind({})
AllowClear.args = {
  ...Placeholder.args,
  modelValue: '我是可以清空的',
  allowClear: true,
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
  placeholder: '无边框',
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Placeholder.args,
  disabled: true,
}

export const Maxlength = Template.bind({})
Maxlength.args = {
  modelValue: '123456',
  maxlength: 6,
}

export const ShowCount: Story = (args) => ({
  components: { NInput },
  setup: () => ({ args }),
  template: `
    <n-input class="mb-xs" v-bind="args" />
    <n-input v-bind="args" :maxlength="50" />
  `,
})
ShowCount.args = {
  ...Placeholder.args,
  showCount: true,
}

export const Error: Story = (args) => ({
  components: {
    NInput,
    NIcon,
    UserIcon,
  },
  setup: () => ({ args }),
  template: `
    <div>
      <n-input class="mb-xs" v-bind="args" />
      <n-input v-bind="args">
        <template #prefix>
          <n-icon><user-icon /></n-icon>
        </template>
      </n-input>
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

export const PrefixAndSuffix: Story = () => ({
  components: {
    NInput,
    NIcon,
    UserIcon,
    InfoIcon,
  },
  template: `
    <div>
      <n-input class="mb-xs" prefix="¥" suffix="RMB" />
      <n-input>
        <template #prefix>
          <n-icon><user-icon /></n-icon>
        </template>
        <template #suffix>
          <n-icon><info-icon /></n-icon>
        </template>
      </n-input>
    </div>
  `,
})

export default meta

import type { Meta, Story } from '@storybook/vue3'

import NIcon from '../icon/icon.vue'
import NSpace from '../space/space.vue'
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
  placeholder: '小尺寸',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  placeholder: '大尺寸',
}

export const Password: Story = (args) => ({
  components: {
    NInput,
    NSpace,
  },
  setup: () => ({ args }),
  template: `
    <n-space direction="vertical">
      <n-input v-bind="args" />
      <n-input v-bind="args" show-count />
      <n-input v-bind="args" :maxlength="50" show-count />
    </n-space>
  `,
})
Password.args = {
  type: 'password',
  modelValue: '7758521',
  allowClear: true,
}

export const AllowClear = Template.bind({})
AllowClear.args = {
  ...Placeholder.args,
  modelValue: '我是可以清空的',
  allowClear: true,
}

export const AddonBeforeAndAfter = Template.bind({})
AddonBeforeAndAfter.args = {
  addonBefore: 'https://',
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
  modelValue: '123木头人',
  maxlength: 6,
}

export const ShowCount: Story = (args) => ({
  components: {
    NInput,
    NSpace,
  },
  setup: () => ({ args }),
  template: `
    <n-space direction="vertical">
      <n-input v-bind="args" />
      <n-input v-bind="args" :maxlength="50" />
    </n-space>
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
    NSpace,
    UserIcon,
  },
  setup: () => ({ args }),
  template: `
    <n-space direction="vertical">
      <n-input v-bind="args" />
      <n-input v-bind="args">
        <template #prefix>
          <n-icon><user-icon /></n-icon>
        </template>
      </n-input>
    </n-space>
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
    NSpace,
    UserIcon,
    InfoIcon,
  },
  template: `
    <n-space direction="vertical">
      <n-input prefix="¥" suffix="RMB" />
      <n-input>
        <template #prefix>
          <n-icon><user-icon /></n-icon>
        </template>
        <template #suffix>
          <n-icon><info-icon /></n-icon>
        </template>
      </n-input>
    </n-space>
  `,
})

export default meta

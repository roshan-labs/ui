import type { Meta, Story } from '@storybook/vue3'

import Button from './button.vue'

const meta: Meta = {
  title: 'design-system/Button',
  component: Button,
  argTypes: {
    // Events
    onClick: {
      description: '点击按钮时的回调',
      action: 'click',
    },
    // Props
    type: {
      description: '按钮类型',
      control: { type: 'select' },
      options: ['default', 'primary', 'dashed', 'text', 'link'],
    },
    block: {
      description: '将按钮宽度调整为其父宽度的选项',
    },
    danger: {
      description: '设置危险按钮',
    },
    disabled: {
      description: '按钮失效状态',
    },
    ghost: {
      description: '幽灵属性，使按钮背景透明',
    },
    href: {
      description: '点击跳转的地址，指定此属性 button 的行为和 a 链接一致',
    },
    htmlType: {
      description: '设置 button 原生 type 值',
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
  },
}

const Template: Story = (args) => ({
  components: { NButton: Button },
  setup() {
    return { args }
  },
  template: '<n-button v-bind="args">{{ args.default }}</n-button>',
})

export const Default = Template.bind({})
Default.args = {
  type: 'default',
  default: 'Button',
}

export const Primary = Template.bind({})
Primary.args = {
  ...Default.args,
  type: 'primary',
}

export const Dashed = Template.bind({})
Dashed.args = {
  ...Default.args,
  type: 'dashed',
}

export const Text = Template.bind({})
Text.args = {
  ...Default.args,
  type: 'text',
}

export const Link = Template.bind({})
Link.args = {
  ...Default.args,
  type: 'link',
}

export const Block = Template.bind({})
Block.args = {
  ...Primary.args,
  block: true,
}

export const Danger: Story = (args) => ({
  components: { NButton: Button },
  setup: () => ({ args }),
  template: `
    <n-button v-bind="args" type="primary" danger>Primary</n-button>
    <n-button v-bind="args" danger>Default</n-button>
    <n-button v-bind="args" type="dashed" danger>Dashed</n-button>
    <n-button v-bind="args" type="text" danger>Text</n-button>
    <n-button v-bind="args" type="link" danger>Link</n-button>
  `,
})

export const Disabled: Story = (args) => ({
  components: { NButton: Button },
  setup: () => ({ args }),
  template: `
    <div class="mb-8px">
      <n-button v-bind="args" type="primary">Primary</n-button>
      <n-button v-bind="args" type="primary" disabled>Primary(disabled)</n-button>
    </div>
    <div class="mb-8px">
      <n-button v-bind="args">Default</n-button>
      <n-button v-bind="args" disabled>Default(disabled)</n-button>
    </div>
    <div class="mb-8px">
      <n-button v-bind="args" type="dashed">Dashed</n-button>
      <n-button v-bind="args" type="dashed" disabled>Dashed(disabled)</n-button>
    </div>
    <div class="mb-8px">
      <n-button v-bind="args" type="text">Text</n-button>
      <n-button v-bind="args" type="text" disabled>Text(disabled)</n-button>
    </div>
    <div class="mb-8px">
      <n-button v-bind="args" type="link">Link</n-button>
      <n-button v-bind="args" type="link" disabled>Link(disabled)</n-button>
    </div>
    <div class="mb-8px">
      <n-button v-bind="args" danger>Danger Default</n-button>
      <n-button v-bind="args" danger disabled>Danger Default(disabled)</n-button>
    </div>
    <div class="mb-8px">
      <n-button v-bind="args" type="text" danger>Danger Text</n-button>
      <n-button v-bind="args" type="text" danger disabled>Danger Text(disabled)</n-button>
    </div>
    <div class="mb-8px">
      <n-button v-bind="args" type="link" danger>Danger Link</n-button>
      <n-button v-bind="args" type="link" danger disabled>Danger Link(disabled)</n-button>
    </div>
  `,
})

export const Ghost: Story = (args) => ({
  components: { NButton: Button },
  setup: () => ({ args }),
  template: `
    <div class="bg-gray-400 p-md">
      <n-button v-bind="args" type="primary">Primary Button</n-button>
      <n-button v-bind="args">Default Button</n-button>
      <n-button v-bind="args" type="dashed">Dashed Button</n-button>
      <n-button v-bind="args" type="primary" danger>Primary Danger</n-button>
    </div>
  `,
})
Ghost.args = {
  ghost: true,
}

export const Href = Template.bind({})
Href.args = {
  default: 'link',
  type: 'link',
  href: 'https://www.baidu.com',
  target: '_blank',
}

export const HtmlType = Template.bind({})
HtmlType.args = {
  ...Primary.args,
  htmlType: 'button',
}

export { meta as default }

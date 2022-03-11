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
      options: ['default', 'primary', 'dashed', 'text'],
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

export const Danger: Story = () => ({
  components: { NButton: Button },
  template: `
    <n-button type="primary" danger>Primary</n-button>
    <n-button danger>Default</n-button>
    <n-button type="dashed" danger>Dashed</n-button>
    <n-button type="text" danger>Text</n-button>
    <n-button type="link" danger>Link</n-button>
  `,
})

export const Disabled: Story = () => ({
  components: { NButton: Button },
  template: `
    <div style="margin-bottom: 8px">
      <n-button type="primary">Primary</n-button>
      <n-button type="primary" disabled>Primary(disabled)</n-button>
    </div>
    <div style="margin-bottom: 8px">
      <n-button>Default</n-button>
      <n-button disabled>Default(disabled)</n-button>
    </div>
    <div style="margin-bottom: 8px">
      <n-button type="dashed">Dashed</n-button>
      <n-button type="dashed" disabled>Dashed(disabled)</n-button>
    </div>
    <div style="margin-bottom: 8px">
      <n-button type="text">Text</n-button>
      <n-button type="text" disabled>Text(disabled)</n-button>
    </div>
    <div>
      <n-button type="link">Link</n-button>
      <n-button type="link" disabled>Link(disabled)</n-button>
    </div>
  `,
})

export { meta as default }

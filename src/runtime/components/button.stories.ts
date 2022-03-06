import type { Meta, Story } from '@storybook/vue3'

import Button from './button.vue'

const meta: Meta = {
  title: 'design-system/Button',
  component: Button,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['default', 'primary', 'dashed'],
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

export { meta as default }

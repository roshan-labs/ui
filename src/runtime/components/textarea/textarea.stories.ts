import type { Meta, Story } from '@storybook/vue3'

import NTextarea from './textarea.vue'

const meta: Meta = {
  title: 'design-system/Data-Entry/textarea',
  component: NTextarea,
  decorators: [() => ({ template: '<div class="w-[260px]"><story /></div>' })],
  argTypes: {
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
}

const Template: Story = (args) => ({
  components: { NTextarea },
  setup: () => ({ args }),
  template: '<n-textarea v-bind="args" />',
})

export const Default = Template.bind({})

export const Placeholder = Template.bind({})
Placeholder.args = {
  placeholder: 'Please input',
}

export default meta

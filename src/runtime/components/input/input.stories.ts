import type { Meta, Story } from '@storybook/vue3'

import NInput from './input.vue'

const meta: Meta = {
  title: 'design-system/Data-Entry/Input',
  component: NInput,
}

const Template: Story = (args) => ({
  components: { NInput },
  setup: () => ({ args }),
  template: '<n-input v-bind="args" />',
})

export const Default = Template.bind({})

export default meta

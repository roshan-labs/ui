import type { Meta, Story } from '@storybook/vue3'

import NInput from './input.vue'

const meta: Meta = {
  title: 'design-system/数据录入/Input',
  component: NInput,
}

const Template: Story = (args) => ({
  components: { NInput },
  setup: () => ({ args }),
  template: '<n-input />',
})

export const Default = Template.bind({})

export default meta

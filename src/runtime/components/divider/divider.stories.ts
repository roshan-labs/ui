import type { Meta, Story } from '@storybook/vue3'

import Divider from './divider.vue'

const meta: Meta = {
  title: 'design-system/Divider',
  component: Divider,
}

const Template: Story = (args) => ({
  components: { NDivider: Divider },
  setup: () => ({ args }),
  template: '<n-divider v-bind="args">{{ args.default }}</n-divider>',
})

export const Horizontal = Template.bind({})
Horizontal.args = {}

export default meta

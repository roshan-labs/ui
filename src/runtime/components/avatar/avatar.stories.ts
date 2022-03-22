import type { Meta, Story } from '@storybook/vue3'

import NAvatar from './avatar.vue'

const meta: Meta = {
  title: 'design-system/Avatar',
  component: NAvatar,
  argTypes: {
    src: {
      description: '',
      control: 'text',
    },
  },
}

const Template: Story = (args) => ({
  components: { NAvatar },
  setup: () => ({ args }),
  template: '<n-avatar v-bind="args"></n-avatar>',
})

export const Src = Template.bind({})
Src.args = {
  src: 'https://joeschmoe.io/api/v1/random',
}

export default meta

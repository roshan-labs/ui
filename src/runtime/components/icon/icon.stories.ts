import type { Meta, Story } from '@storybook/vue3'

import NIcon from './icon.vue'
import IconAntDesign from '~icons/ant-design/ant-design-outlined'

const meta: Meta = {
  title: 'design-system/icon',
  component: NIcon,
}

const Template: Story = (args) => ({
  components: {
    NIcon,
    IconAntDesign,
  },
  setup: () => ({ args }),
  template: `
    <n-icon>
      <icon-ant-design />
    </n-icon>
  `,
})

export const Default = Template.bind({})

export default meta

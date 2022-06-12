import type { Meta, Story } from '@storybook/vue3'

import NCard from './n-card.vue'

const meta: Meta = {
  title: '设计系统/数据展示/卡片 Card',
  component: NCard,
  decorators: [() => ({ template: '<div class="w-[300px]"><story /></div>' })],
}

export const Default: Story = (args) => ({
  components: { NCard },
  setup: () => ({ args }),
  template: `
    <n-card v-bind="args">{{ args.default }}</n-card>
  `,
})
Default.args = {
  default: '卡片内容',
}

export const Title = Default.bind({})
Title.args = {
  ...Default.args,
  title: '卡片标题',
}

export const BodyStyle = Default.bind({})
BodyStyle.args = {
  ...Default.args,
  bodyStyle: 'font-size: 20px; color: #2f54eb',
}

export const Cover: Story = (args) => ({
  components: {
    NCard,
  },
  setup: () => ({ args }),
  template: `
    <n-card v-bind="args">
      <template #cover>
        <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />
      </template>
      <span>带封面的卡片</span>
    </n-card>
  `,
})

export const Extra: Story = (args) => ({
  components: {
    NCard,
  },
  setup: () => ({ args }),
  template: `
    <n-card v-bind="args">
      <template #extra>
        <a href="#">更多</a>
      </template>
      {{ args.default }}
    </n-card>
  `,
})
Extra.args = {
  ...Title.args,
}

export default meta

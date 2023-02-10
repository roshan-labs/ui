import type { Meta, Story } from '@storybook/vue3'

import { data } from '../pro-table/pro-table.stories'
import type { ProCrudColumn } from './types'
import { ProCrud } from '.'

export default {
  title: '高级组件/增删改查 Crud',
  component: ProCrud,
} as Meta

const Template: Story = (args) => ({
  components: { ProCrud },
  setup: () => ({ args }),
  template: '<pro-crud class="test" v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
  data,
  columns: [
    { prop: 'date', label: '日期' },
    { prop: 'name', label: '姓名' },
    { prop: 'state', label: '州' },
    { prop: 'city', label: '城市' },
    { prop: 'address', label: '地区' },
  ] as ProCrudColumn[],
  border: true,
}

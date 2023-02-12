import type { Meta, Story } from '@storybook/vue3'
import { h } from 'vue'

import { data } from '../pro-table/pro-table.stories'
import type { ProCrudColumn, ProCrudSearch } from './types'
import { ProCrud } from '.'

export default {
  title: '高级组件/增删改查 Crud',
  component: ProCrud,
} as Meta

const Template: Story = (args) => ({
  components: { ProCrud },
  setup: () => ({ args }),
  template: '<pro-crud v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
  data,
  columns: [
    { prop: 'date', label: '日期' },
    { prop: 'name', label: '姓名' },
    { prop: 'state', label: '州' },
    { prop: 'city', label: '城市' },
    { prop: 'address', label: '地区', showOverflowTooltip: true },
    { prop: 'zip', label: '邮编' },
    { prop: 'tag', label: '标签' },
  ] as ProCrudColumn[],
}
Default.storyName = '默认'

export const TableSlot: Story = (args) => ({
  components: { ProCrud },
  setup: () => ({ args }),
  template: `
    <pro-crud v-bind="args">
      <template #date-column="{ row }">插槽：{{ row.date }}</template>
      <template #name-header="{ column }">插槽：{{ column.label }}</template>
    </pro-crud>
  `,
})
TableSlot.args = {
  data,
  columns: [
    { prop: 'date', label: '日期', slots: { default: 'date-column' } },
    { prop: 'name', label: '姓名', slots: { header: 'name-header' } },
    {
      prop: 'state',
      label: '州',
      slots: {
        default: ({ row }) => h('span', `插槽：${row.state}`),
        header: ({ column }) => h('span', `插槽：${column.label}`),
      },
    },
  ] as ProCrudColumn[],
}
TableSlot.storyName = '插槽'

export const Search = Template.bind({})
Search.args = {
  data,
  columns: [
    {
      prop: 'date',
      label: '日期',
      search: { type: 'date-picker', span: 6, component: { style: 'width: 100%' } },
    },
    { prop: 'name', label: '姓名', search: true },
    { prop: 'state', label: '州', search: true },
    { prop: 'city', label: '城市', search: true },
  ] as ProCrudColumn[],
  search: { labelWidth: 60 } as ProCrudSearch,
}
Search.storyName = '支持查询'

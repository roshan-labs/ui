import type { Meta, Story } from '@storybook/vue3'
import { h } from 'vue'

import type { ProCrudColumn, ProCrudSearch, ProCrudPagination } from './types'
import { ProCrud } from '.'

export default {
  title: '高级组件/增删改查 ProCrud',
  component: ProCrud,
  argTypes: {
    'onUpdate:currentPage': { action: 'update:current-page' },
  },
} as Meta

const data = Array.from({ length: 10 }).map(() => ({
  date: '2016-05-03',
  name: 'Tom',
  state: 'California',
  city: 'Los Angeles',
  address: 'No. 189, Grove St, Los Angeles',
  zip: 'CA 90036',
  tag: 'Home',
}))

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

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  loading: true,
}
Loading.storyName = '加载中'

export const Border = Template.bind({})
Border.args = {
  ...Default.args,
  border: true,
}
Border.storyName = '带边框'

export const Pagination = Template.bind({})
Pagination.args = {
  ...Default.args,
  pagination: {
    currentPage: 1,
    total: 1000,
  } as ProCrudPagination,
}
Pagination.storyName = '带分页'

export const PagerCount = Template.bind({})
PagerCount.args = {
  ...Default.args,
  pagination: {
    pagerCount: 11,
    total: 1000,
  } as ProCrudPagination,
}
PagerCount.storyName = '最大页码'

export const PageBackground = Template.bind({})
PageBackground.args = {
  ...Default.args,
  pagination: {
    currentPage: 1,
    total: 1000,
    background: true,
  } as ProCrudPagination,
}
PageBackground.storyName = '分页带背景'

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
TableSlot.storyName = '表格插槽'

export const SearchAction = Template.bind({})
SearchAction.args = {
  data,
  columns: [
    { prop: 'date', label: '日期', search: true },
    { prop: 'name', label: '姓名', search: true },
  ] as ProCrudColumn[],
  search: { action: { resetText: '清空', submitText: '搜索' } } as ProCrudSearch,
}
SearchAction.storyName = '查询按钮配置'

export const Search = Template.bind({})
Search.args = {
  data,
  columns: [
    {
      prop: 'date',
      label: '日期',
      search: { type: 'date-picker', component: { style: 'width: 100%' } },
    },
    { prop: 'name', label: '姓名', search: true },
    { prop: 'state', label: '州', search: true },
    { prop: 'city', label: '城市', search: true },
    { prop: 'address', label: '地区', search: true, showOverflowTooltip: true },
  ] as ProCrudColumn[],
}
Search.storyName = '带查询'

export const InlineSearch = Template.bind({})
InlineSearch.args = {
  data,
  columns: [
    {
      prop: 'date',
      label: '日期',
      search: { type: 'date-picker', component: { style: 'width: 100%' } },
    },
    { prop: 'name', label: '姓名', search: true },
  ] as ProCrudColumn[],
  search: { inline: true } as ProCrudSearch,
}
InlineSearch.storyName = '行内布局查询'

export const SearchMethod = Template.bind({})
SearchMethod.args = {
  ...Search.args,
}
SearchMethod.storyName = '查询请求'

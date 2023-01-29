import type { Meta, Story } from '@storybook/vue3'

import type { DataTableColumn, DataTablePagination } from './types'
import { ProTable } from './index'

export default {
  title: '高级组件/ProTable',
  component: ProTable,
  excludeStories: ['data', 'columns'],
} as Meta

export const data = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]

export const columns: DataTableColumn[] = [
  { prop: 'date', label: 'Date' },
  {
    prop: 'name',
    label: 'Name',
  },
  {
    prop: 'state',
    label: 'State',
  },
  {
    prop: 'city',
    label: 'City',
  },
  {
    prop: 'address',
    label: 'Address',
    showOverflowTooltip: true,
  },
  {
    prop: 'zip',
    label: 'Zip',
  },
  {
    prop: 'tag',
    label: 'Tag',
  },
]

const Template: Story = (args) => ({
  components: { ProTable },
  setup: () => ({ args }),
  template: '<pro-table v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
  columns,
  data,
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  loading: true,
}

export const ColumnSlot: Story = (args) => ({
  components: { ProTable },
  setup: () => ({ args }),
  template: `
    <pro-table v-bind="args">
      <template #name="{ row }">
        Mr {{ row.name }}
      </template>
    </pro-table>
  `,
})
ColumnSlot.args = {
  columns: [
    { prop: 'date', label: 'Date' },
    { prop: 'name', label: 'Name', slot: 'name' },
  ] as DataTableColumn[],
  data,
}

export const HeaderSlot: Story = (args) => ({
  components: { ProTable },
  setup: () => ({ args }),
  template: `
    <pro-table v-bind="args">
      <template #headerName>
        Custom Header
      </template>
    </pro-table>
  `,
})
HeaderSlot.args = {
  columns: [
    { prop: 'date', label: 'Date' },
    { prop: 'name', label: 'Name', headerSlot: 'headerName' },
  ] as DataTableColumn[],
  data,
}

export const Pagination = Template.bind({})
Pagination.args = {
  ...Default.args,
  pagination: {
    currentPage: 1,
    total: 4,
  } as DataTablePagination,
}

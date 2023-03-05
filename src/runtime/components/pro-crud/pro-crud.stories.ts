import type { Meta, Story } from '@storybook/vue3'
import { h } from 'vue'

import type {
  ProCrudColumn,
  ProCrudSearch,
  ProCrudPagination,
  ProCrudSearchRequest,
  ProCrudActions,
  ProCrudActionsColumn,
} from './types'
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

export const Border = Template.bind({})
Border.args = {
  ...Default.args,
  border: true,
}
Border.storyName = '带边框'

export const Title = Template.bind({})
Title.args = {
  ...Default.args,
  title: '我是一个带标题的高级表格',
}
Title.storyName = '带标题'

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

export const Search = Template.bind({})
Search.args = {
  data,
  columns: [
    { prop: 'date', label: '日期', search: true },
    { prop: 'name', label: '姓名', search: true },
    { prop: 'state', label: '州', search: true },
    { prop: 'city', label: '城市', search: true },
    { prop: 'address', label: '地区', search: true, showOverflowTooltip: true },
  ] as ProCrudColumn[],
  searchRequest: (({ done }) => {
    setTimeout(() => {
      done()
    }, 2000)
  }) as ProCrudSearchRequest,
  pagination: {
    currentPage: 1,
    total: 1000,
  } as ProCrudPagination,
}
Search.storyName = '带查询'

export const SearchAction = Template.bind({})
SearchAction.args = {
  ...Search.args,
  search: { action: { resetText: '清空', submitText: '搜索' } } as ProCrudSearch,
}
SearchAction.storyName = '查询按钮配置'

export const InlineSearch = Template.bind({})
InlineSearch.args = {
  ...Search.args,
  search: { inline: true } as ProCrudSearch,
}
InlineSearch.storyName = '行内布局查询'

export const RefreshAction = Template.bind({})
RefreshAction.args = {
  ...Search.args,
  actions: { refresh: true } as ProCrudActions,
}
RefreshAction.storyName = '可刷新'

export const SettingAction = Template.bind({})
SettingAction.args = {
  ...Search.args,
  actions: { setting: true } as ProCrudActions,
}
SettingAction.storyName = '列设置'

export const SizeAction = Template.bind({})
SizeAction.args = {
  ...Search.args,
  actions: { size: true } as ProCrudActions,
  size: 'small',
}
SizeAction.storyName = '密度'

export const HideColumn = Template.bind({})
HideColumn.args = {
  ...Search.args,
  columns: [
    { prop: 'date', label: '日期', search: true, hide: true },
    { prop: 'name', label: '姓名', search: true },
    { prop: 'state', label: '州', search: true },
    { prop: 'city', label: '城市', search: true },
    { prop: 'address', label: '地区', search: true, showOverflowTooltip: true },
  ] as ProCrudColumn[],
}
HideColumn.storyName = '列隐藏'

export const ActionsColumn = Template.bind({})
ActionsColumn.args = {
  ...Default.args,
  actionsColumn: { hide: true } as ProCrudActionsColumn,
}
ActionsColumn.storyName = '操作列隐藏'

export const SearchLabelWidth = Template.bind({})
SearchLabelWidth.args = {
  data,
  columns: [
    { prop: 'date', label: '日期', search: true },
    { prop: 'name', label: '姓名', search: { labelWidth: 80 } },
  ] as ProCrudColumn[],
  search: { labelWidth: 120 } as ProCrudSearch,
}
SearchLabelWidth.storyName = '查询字段标题宽度'

export const SearchValidate = Template.bind({})
SearchValidate.args = {
  data,
  columns: [
    { prop: 'date', label: '日期', search: { rules: [{ required: true, message: '不能为空' }] } },
    { prop: 'name', label: '姓名', search: true },
  ] as ProCrudColumn[],
  search: {
    rules: {
      name: [{ required: true, message: '不能为空' }],
    },
  } as ProCrudSearch,
}
SearchValidate.storyName = '查询验证'

export const SearchLayout = Template.bind({})
SearchLayout.args = {
  data,
  columns: [
    { prop: 'date', label: '日期', search: { span: 8 } },
    { prop: 'name', label: '姓名', search: true },
  ] as ProCrudColumn[],
}
SearchLayout.storyName = '查询布局'

export const SearchDefaultValue = Template.bind({})
SearchDefaultValue.args = {
  data,
  columns: [
    {
      prop: 'date',
      label: '日期',
      search: { type: 'date-picker', value: new Date(), component: { style: 'width: 100%' } },
    },
    { prop: 'name', label: '姓名', search: true },
  ] as ProCrudColumn[],
}
SearchDefaultValue.storyName = '查询默认值'

export const SearchCollapse = Template.bind({})
SearchCollapse.args = {
  ...Search.args,
  search: {
    collapseCount: 2,
    action: {
      hideSpan: 8,
      showSpan: 20,
    },
  } as ProCrudSearch,
}
SearchCollapse.storyName = '查询展开折叠'

export const AddData = Template.bind({})
AddData.args = {
  data,
  columns: [
    { prop: 'date', label: '日期', create: true },
    { prop: 'name', label: '姓名', create: true },
  ] as ProCrudColumn[],
  title: '我是一个可新增数据表格',
}
AddData.storyName = '新增数据'

export const AddDataValidate = Template.bind({})
AddDataValidate.args = {
  data,
  columns: [
    {
      prop: 'date',
      label: '日期',
      create: {
        rules: [{ required: true, message: '不能为空' }],
      },
    },
    {
      prop: 'name',
      label: '姓名',
      create: {
        rules: [{ required: true, message: '不能为空' }],
      },
    },
  ] as ProCrudColumn[],
  title: '我是一个可新增数据表格',
}
AddDataValidate.storyName = '新增数据带验证'

export const AllUse = Template.bind({})
AllUse.args = {
  title: '一个综合使用的 CRUD 查询表格',
  data,
  columns: [
    { prop: 'date', label: '日期', search: true, create: true },
    { prop: 'name', label: '姓名', search: true, create: true },
    { prop: 'state', label: '州', search: true, create: true },
    { prop: 'city', label: '城市', search: true },
    { prop: 'address', label: '地区', search: true, showOverflowTooltip: true },
  ] as ProCrudColumn[],
  pagination: {
    currentPage: 1,
    total: 1000,
  } as ProCrudPagination,
  searchRequest: (({ done }) => {
    setTimeout(() => {
      done()
    }, 2000)
  }) as ProCrudSearchRequest,
  search: { collapseCount: 3 } as ProCrudSearch,
  actions: { refresh: true, setting: true } as ProCrudActions,
}
AllUse.storyName = '综合使用'

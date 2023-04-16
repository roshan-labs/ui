import type { Meta, StoryObj } from '@storybook/vue3'
import { h } from 'vue'
import { ElButton, ElLink } from 'element-plus'

import type {
  ProCrudColumn,
  ProCrudSearch,
  ProCrudPagination,
  ProCrudActions,
  ProCrudActionsColumn,
  ProCrudSearchEvent,
  ProCrudCreateEvent,
} from './types'
import ProCrud from './pro-crud.vue'

type Story = StoryObj<typeof ProCrud>

const meta: Meta<typeof ProCrud> = {
  title: '高级组件/增删改查 ProCrud',
  component: ProCrud,
  argTypes: {
    onSelect: { action: 'select' },
    onSelectAll: { action: 'select-all' },
    onSelectionChange: { action: 'selection-change' },
    'onUpdate:pagination': { action: 'update:pagination' },
    'onUpdate:size': { action: 'update:size' },
    'onUpdate:searchFields': { action: 'update:searchFields' },
    onSearch: { action: 'search' },
    onRemove: { action: 'remove' },
    onCreate: { action: 'create' },
    onEdit: { action: 'edit' },
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'large'],
    },
  },
}

export default meta

const data = Array.from({ length: 10 }).map(() => ({
  date: '2016-05-03',
  name: 'Tom',
  state: 'California',
  city: 'Los Angeles',
  address: 'No. 189, Grove St, Los Angeles',
  zip: 'CA 90036',
  tag: 'Home',
}))

export const Default: Story = {
  name: '默认',
  args: {
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
  } as any,
}

export const CustomClass: Story = {
  name: '自定义 class',
  args: {
    ...Default.args,
    class: 'border border-yellow-500',
  },
}

export const Border: Story = {
  name: '带边框',
  args: {
    ...Default.args,
    border: true,
  },
}

export const Height: Story = {
  name: '固定高度',
  args: {
    ...Default.args,
    height: 250,
  },
}

export const Title: Story = {
  name: '带标题',
  args: {
    ...Default.args,
    title: '我是一个带标题的高级表格',
  },
}

export const ToolbarSlot: Story = {
  name: '工具栏插槽',
  render: (args) => ({
    components: { ProCrud, ElLink },
    setup: () => ({ args }),
    template: `
    <pro-crud v-bind="args">
      <template #toolbar>
        <el-link type="primary">自定义按钮</el-link>
        <el-link type="primary">自定义按钮</el-link>
      </template>
    </pro-crud>
  `,
  }),
  args: {
    ...Default.args,
    actions: { size: true, setting: true } as ProCrudActions,
  },
}

export const Pagination: Story = {
  name: '带分页',
  args: {
    ...Default.args,
    pagination: {
      currentPage: 1,
      total: 1000,
    } as ProCrudPagination,
  },
}

export const PageSize: Story = {
  name: '每页个数',
  args: {
    ...Default.args,
    pagination: {
      currentPage: 2,
      pageSize: 10,
      total: 1000,
      layout: 'sizes, prev, pager, next',
    } as ProCrudPagination,
  },
}

export const PagerCount: Story = {
  name: '最大页码',
  args: {
    ...Default.args,
    pagination: {
      pagerCount: 11,
      total: 1000,
    } as ProCrudPagination,
  },
}

export const PageBackground: Story = {
  name: '分页带背景',
  args: {
    ...Default.args,
    pagination: {
      currentPage: 1,
      total: 1000,
      background: true,
    } as ProCrudPagination,
  },
}

export const TableSlot: Story = {
  name: '表格插槽',
  render: (args) => ({
    components: { ProCrud },
    setup: () => ({ args }),
    template: `
      <pro-crud v-bind="args">
        <template #date-column="{ row }">插槽：{{ row.date }}</template>
        <template #name-header="{ column }">插槽：{{ column.label }}</template>
      </pro-crud>
    `,
  }),
  args: {
    ...Default.args,
    columns: [
      { prop: 'date', label: '日期', slots: { default: 'date-column' } },
      { prop: 'name', label: '姓名', slots: { header: 'name-header' } },
      {
        prop: 'state',
        label: '州',
        slots: {
          default: ({ row }) => h('span', () => `插槽：${row.state}`),
          header: ({ column }) => h('span', () => `插槽：${column.label}`),
        },
      },
    ] as ProCrudColumn[],
  },
}

export const RefreshAction: Story = {
  name: '可刷新',
  args: {
    ...Default.args,
    actions: { refresh: true } as ProCrudActions,
  },
}

export const SettingAction: Story = {
  name: '列设置',
  args: {
    ...Default.args,
    actions: { setting: true } as ProCrudActions,
  },
}

export const SizeAction: Story = {
  name: '密度',
  args: {
    ...Default.args,
    actions: { size: true } as ProCrudActions,
    size: 'small',
  },
}

export const HideColumn: Story = {
  name: '列隐藏',
  args: {
    ...Default.args,
    columns: [
      { prop: 'date', label: '日期', search: true, hide: true },
      { prop: 'name', label: '姓名', search: true },
      { prop: 'state', label: '州', search: true },
      { prop: 'city', label: '城市', search: true },
      { prop: 'address', label: '地区', search: true, showOverflowTooltip: true },
    ] as ProCrudColumn[],
  },
}

export const ViewRow: Story = {
  name: '查看',
  args: {
    ...Default.args,
    columns: [
      { prop: 'date', label: '日期' },
      { prop: 'name', label: '姓名', view: false },
    ] as ProCrudColumn[],
  },
}

export const ViewRowSlot: Story = {
  name: '查看数据插槽',
  render: (args) => ({
    components: { ProCrud, ElButton },
    setup: () => ({ args }),
    template: `
      <pro-crud v-bind="args">
        <template #actions-column-view="{ view }">
          <el-button type="primary" link @click="view">自定义查看</el-button>
        </template>
      </pro-crud>
    `,
  }),
  args: {
    ...Default.args,
  },
}

export const RemoveRow: Story = {
  name: '删除数据',
  args: {
    ...Default.args,
    actionsColumn: {
      remove: true,
    } as ProCrudActionsColumn,
  },
}

export const RemoveSlot: Story = {
  name: '删除数据插槽',
  render: (args) => ({
    components: { ProCrud, ElButton },
    setup: () => ({ args }),
    template: `
      <pro-crud v-bind="args">
        <template #actions-column-remove="{ remove }">
          <el-button type="primary" link @click="remove">自定义删除</el-button>
        </template>
      </pro-crud>
    `,
  }),
  args: {
    ...RemoveRow.args,
  },
}

export const EditData: Story = {
  name: '编辑数据',
  args: {
    ...Default.args,
    columns: [
      { prop: 'date', label: '日期', edit: true },
      {
        prop: 'name',
        label: '姓名',
        edit: {
          type: 'input',
        },
      },
    ] as ProCrudColumn[],
  },
}

export const EditDataValidate: Story = {
  name: '编辑数据带验证',
  args: {
    ...Default.args,
    columns: [
      {
        prop: 'date',
        label: '日期',
        edit: { rules: [{ required: true, message: '日期不能为空' }] },
      },
      {
        prop: 'name',
        label: '姓名',
        edit: { rules: [{ required: true, message: '姓名不能为空' }] },
      },
    ] as ProCrudColumn[],
  },
}

export const EditSlot: Story = {
  name: '编辑数据插槽',
  render: (args) => ({
    components: { ProCrud, ElButton },
    setup: () => ({ args }),
    template: `
      <pro-crud v-bind="args">
        <template #actions-column-edit="{ size, edit }">
          <el-button type="primary" :size="size" link @click="edit">自定义编辑</el-button>
        </template>
      </pro-crud>
    `,
  }),
  args: {
    ...EditData.args,
  },
}

export const Search: Story = {
  name: '查询条件',
  args: {
    ...Default.args,
    columns: [
      { prop: 'date', label: '日期', search: true },
      { prop: 'name', label: '姓名', search: true },
      { prop: 'state', label: '州', search: true },
      { prop: 'city', label: '城市', search: true },
      { prop: 'address', label: '地区', search: true, showOverflowTooltip: true },
    ] as ProCrudColumn[],
    onSearch: (({ done }) => {
      window.setTimeout(done, 1000)
    }) as ProCrudSearchEvent,
    pagination: {
      currentPage: 1,
      total: 1000,
    } as ProCrudPagination,
  },
}

export const SearchAction: Story = {
  name: '查询按钮配置',
  args: {
    ...Search.args,
    search: { action: { resetText: '清空', submitText: '搜索' } } as ProCrudSearch,
  },
}

export const InlineSearch: Story = {
  name: '行内布局查询',
  args: {
    ...Search.args,
    search: { inline: true } as ProCrudSearch,
  },
}

export const SearchLabelWidth: Story = {
  name: '查询字段标题宽度',
  args: {
    ...Default.args,
    columns: [
      { prop: 'date', label: '日期', search: true },
      { prop: 'name', label: '姓名', search: { labelWidth: 80 } },
    ] as ProCrudColumn[],
    search: { labelWidth: 120 } as ProCrudSearch,
  },
}

export const SearchValidate: Story = {
  name: '查询验证',
  args: {
    ...Default.args,
    columns: [
      { prop: 'date', label: '日期', search: { rules: [{ required: true, message: '不能为空' }] } },
      { prop: 'name', label: '姓名', search: true },
    ] as ProCrudColumn[],
    search: {
      rules: {
        name: [{ required: true, message: '不能为空' }],
      },
    } as ProCrudSearch,
  },
}

export const SearchLayout: Story = {
  name: '查询布局',
  args: {
    ...Default.args,
    columns: [
      { prop: 'date', label: '日期', search: { span: 8 } },
      { prop: 'name', label: '姓名', search: true },
    ] as ProCrudColumn[],
  },
}

export const SearchDefaultValue: Story = {
  name: '查询默认值',
  args: {
    ...Default.args,
    columns: [
      {
        prop: 'date',
        label: '日期',
        search: { type: 'date-picker', value: new Date(), component: { style: 'width: 100%' } },
      },
      { prop: 'name', label: '姓名', search: true },
    ] as ProCrudColumn[],
  },
}

export const SearchCollapse: Story = {
  name: '查询展开折叠',
  args: {
    ...Search.args,
    search: {
      collapseCount: 2,
      action: {
        hideSpan: 8,
        showSpan: 20,
      },
    } as ProCrudSearch,
  },
}

export const SearchFields: Story = {
  name: '查询字段配置',
  args: {
    ...Search.args,
    searchFields: {
      date: '2023-08-01',
    },
  },
}

export const AddData: Story = {
  name: '新增数据',
  args: {
    ...Default.args,
    columns: [
      { prop: 'date', label: '日期', create: true },
      { prop: 'name', label: '姓名', create: true },
    ] as ProCrudColumn[],
  },
}

export const AddDataValidate: Story = {
  name: '新增数据带验证',
  args: {
    ...AddData.args,
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
  },
}

export const ActionsColumnSlot: Story = {
  name: '操作列插槽',
  render: (args) => ({
    components: { ProCrud, ElButton },
    setup: () => ({ args }),
    template: `
      <pro-crud v-bind="args">
        <template #actions-column>
          <el-button type="primary" link>自定义编辑</el-button>
        </template>
      </pro-crud>
    `,
  }),
  args: {
    ...Search.args,
  },
}

export const Selection: Story = {
  name: '多选',
  render: (args) => ({
    components: { ProCrud, ElButton },
    setup: () => ({ args }),
    template: `
      <pro-crud v-bind="args">
        <template #toolbar="{ selection }">
          <el-button type="primary" :disabled="selection.length === 0">批量处理</el-button>
        </template>
      </pro-crud>
    `,
  }),
  args: {
    ...Search.args,
    selection: true,
  },
}

export const SelectionWithBorder: Story = {
  name: '带边框多选',
  args: {
    ...Selection.args,
    border: true,
  },
}

export const AllUse: Story = {
  name: '综合使用',
  render: (args) => ({
    components: { ProCrud, ElButton },
    setup: () => ({ args }),
    template: `
      <pro-crud v-bind="args">
        <template #toolbar>
          <el-button type="primary">自定义按钮</el-button>
        </template>
      </pro-crud>
    `,
  }),
  args: {
    ...Default.args,
    title: '一个综合使用的 CRUD 查询表格',
    columns: [
      { prop: 'date', label: '日期', search: true, create: true },
      { prop: 'name', label: '姓名', search: true, create: true, edit: true },
      { prop: 'state', label: '州', search: true, create: true },
      { prop: 'city', label: '城市', search: true },
      { prop: 'address', label: '地区', search: true, showOverflowTooltip: true },
    ] as ProCrudColumn[],
    search: { collapseCount: 3 } as ProCrudSearch,
    actions: { refresh: true, size: true, setting: true } as ProCrudActions,
    actionsColumn: { remove: true } as ProCrudActionsColumn,
    pagination: Search.args!.pagination,
    onSearch: Search.args!.onSearch,
    onRemove: RemoveRow.args!.onRemove,
    onCreate: (({ loading, done }) => {
      loading.value = true
      window.setTimeout(() => {
        loading.value = false
        done()
      }, 2000)
    }) as ProCrudCreateEvent,
  },
}

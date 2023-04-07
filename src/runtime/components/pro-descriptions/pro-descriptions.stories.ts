import type { Meta, StoryObj } from '@storybook/vue3'
import { ElText, ElTag } from 'element-plus'
import { h } from 'vue'

import type { ProDescriptionsColumn } from './types'
import ProDescriptions from './pro-descriptions.vue'

type Story = StoryObj<typeof ProDescriptions>

const meta: Meta<typeof ProDescriptions> = {
  title: '高级组件/描述列表 ProDescriptions',
  component: ProDescriptions,
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal'] },
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
}

export default meta

export const Default: Story = {
  name: '默认',
  args: {
    columns: [
      { prop: 'name', label: '姓名' },
      { prop: 'sex', label: '性别' },
      { prop: 'phone', label: '电话' },
      { prop: 'profession', label: '职业' },
      { prop: 'address', label: '地址' },
    ] as ProDescriptionsColumn[],
    detail: {
      name: '西门吹雪',
      sex: '男',
      phone: '13333333333',
      profession: '剑神',
      address: '大隐隐于市',
    },
  },
}

export const Border: Story = {
  name: '带边框',
  args: {
    ...Default.args,
    border: true,
  },
}

export const ColumnCount: Story = {
  name: '行数',
  args: {
    ...Default.args,
    column: 1,
  },
}

export const Direction: Story = {
  name: '排列方向',
  args: {
    ...Border.args,
    direction: 'vertical',
  },
}

export const Size: Story = {
  name: '尺寸',
  args: {
    ...Border.args,
    size: 'small',
  },
}

export const Title: Story = {
  name: '标题',
  args: {
    ...Border.args,
    title: '人物介绍',
  },
}

export const TitleSlot: Story = {
  name: '标题插槽',
  render: (args) => ({
    components: { ProDescriptions, ElText },
    setup: () => ({ args }),
    template: `
      <pro-descriptions v-bind="args">
        <template #title>
          <el-text type="primary">人物介绍</el-text>
        </template>
      </pro-descriptions>
    `,
  }),
  args: {
    ...Border.args,
  },
}

export const Extra: Story = {
  name: '自定义区域',
  args: {
    ...Title.args,
    extra: '这里可以自定义',
  },
}

export const ExtraSlot: Story = {
  name: '自定义插槽',
  render: (args) => ({
    components: { ProDescriptions, ElText },
    setup: () => ({ args }),
    template: `
      <pro-descriptions v-bind="args">
        <template #extra>
          <el-text type="primary">自定义区域</el-text>
        </template>
      </pro-descriptions>
    `,
  }),
  args: {
    ...Title.args,
  },
}

export const ItemSlot: Story = {
  name: '列表项插槽',
  render: (args) => ({
    components: { ProDescriptions, ElTag, ElText },
    setup: () => ({ args }),
    template: `
      <pro-descriptions v-bind="args">
        <template #profession="{ value }">
          <el-tag>{{ value }}</el-tag>
        </template>
        <template #address-label="{ label }">
          <el-text type="success">{{ label }}</el-text>
        </template>
      </pro-descriptions>
    `,
  }),
  args: {
    border: true,
    columns: [
      {
        prop: 'name',
        label: '姓名',
        slots: { label: (label: string) => h(ElText, { type: 'danger' }, () => label) },
      },
      { prop: 'sex', label: '性别' },
      {
        prop: 'phone',
        label: '电话',
        slots: { default: (value: string) => h(ElText, { type: 'primary' }, () => value) },
      },
      {
        prop: 'profession',
        label: '职业',
        slots: {
          default: 'profession',
        },
      },
      { prop: 'address', label: '地址', slots: { label: 'address-label' } },
    ] as ProDescriptionsColumn[],
    detail: {
      name: '西门吹雪',
      sex: '男',
      phone: '13333333333',
      profession: '剑神',
      address: '大隐隐于市',
    },
  },
}

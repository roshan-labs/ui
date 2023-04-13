<template>
  <el-descriptions v-bind="$attrs">
    <template v-if="$slots.title" #title>
      <!-- @slot 自定义标题 -->
      <slot name="title" />
    </template>
    <template v-if="$slots.extra" #extra>
      <!-- @slot 自定义操作区 -->
      <slot name="extra" />
    </template>
    <el-descriptions-item v-for="item in columns" :key="item.prop" v-bind="item">
      <template v-if="item.slots?.label" #label>
        <!-- @slot 描述列表项标签内容 -->
        <slot
          v-if="typeof item.slots?.label === 'string'"
          :name="item.slots?.label"
          v-bind="{ label: item.label }"
        />
        <component
          :is="item.slots.label(item.label)"
          v-if="typeof item.slots?.label === 'function'"
        />
      </template>
      <template v-if="typeof item.slots?.default === 'string'" #default>
        <!-- @slot 描述列表项默认内容 -->
        <slot :name="item.slots?.default" v-bind="{ value: getValue(item.prop) }" />
      </template>
      <component
        :is="item.slots.default(getValue(item.prop))"
        v-if="typeof item.slots?.default === 'function'"
      />
      <template v-if="isUndefined(item.slots?.default)">{{ getValue(item.prop) }}</template>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'

import { isUndefined } from '../../utils'
import type { ProDescriptionsColumn } from './types'

interface Props {
  /** 列表配置 */
  columns?: ProDescriptionsColumn[]
  /** 数据 */
  detail?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  detail: () => ({}),
})

const getValue = (prop: string) => props.detail[prop] ?? ''
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

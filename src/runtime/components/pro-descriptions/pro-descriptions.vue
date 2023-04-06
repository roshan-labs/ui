<template>
  <el-descriptions v-bind="$attrs">
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.extra" #extra>
      <slot name="extra" />
    </template>
    <el-descriptions-item v-for="item in columns" :key="item.prop" :label="item.label">
      {{ detail[item.prop] }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'

import type { ProDescriptionsColumn } from './types'

defineProps({
  /** 列表配置 */
  columns: {
    type: Array as PropType<ProDescriptionsColumn[]>,
    default: (): ProDescriptionsColumn[] => [],
  },
  /** 数据 */
  detail: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

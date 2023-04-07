<template>
  <el-descriptions v-bind="$attrs">
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.extra" #extra>
      <slot name="extra" />
    </template>
    <el-descriptions-item v-for="item in columns" :key="item.prop" v-bind="item">
      <template v-if="item.slots?.label" #label>
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
import type { PropType } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'

import { isUndefined } from '../../utils'
import type { ProDescriptionsColumn } from './types'

const props = defineProps({
  /** 列表配置 */
  columns: { type: Array as PropType<ProDescriptionsColumn[]>, default: () => [] },
  /** 数据 */
  detail: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
})

const getValue = (prop: string) => props.detail[prop] ?? ''
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

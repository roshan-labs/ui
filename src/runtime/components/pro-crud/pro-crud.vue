<template>
  <div>
    <pro-form v-if="searchVisible" v-bind="searchProps" />
    <pro-table v-bind="$attrs" :data="data" :columns="columns">
      <template v-for="slotName in columnSlots" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps" />
      </template>
    </pro-table>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, toRef } from 'vue'

import ProForm from '../pro-form/pro-form.vue'
import ProTable from '../pro-table/pro-table.vue'
import type { ProCrudData, ProCrudColumn, ProCrudSearch } from './types'
import { useRenderSearch } from './composables/use-render-search'

const props = defineProps({
  /** 数据集 */
  data: { type: Array as PropType<ProCrudData>, default: () => [] },
  /** 表格列配置 */
  columns: { type: Array as PropType<ProCrudColumn[]>, default: () => [] },
  /** 查询表单操作配置 */
  search: { type: Object as PropType<ProCrudSearch>, default: () => ({}) },
})

const { searchVisible, searchProps } = useRenderSearch(
  toRef(props, 'columns'),
  toRef(props, 'search')
)

const columnSlots = computed(() =>
  props.columns.reduce<string[]>(
    (prev, column) =>
      column.slots
        ? prev.concat(
            Object.values(column.slots).filter((item) => typeof item === 'string') as string[]
          )
        : [],
    []
  )
)
</script>

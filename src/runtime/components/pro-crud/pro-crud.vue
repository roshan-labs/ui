<template>
  <div>
    <pro-table v-bind="$attrs" :data="data" :columns="columns"></pro-table>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import ProTable from '../pro-table/pro-table.vue'
import type { ProTableData } from '../pro-table/types'
import type { ProCrudColumn } from './types'

defineProps({
  /** 表格列配置 */
  columns: { type: Array as PropType<ProCrudColumn[]>, default: () => [] },
  /** 数据集 */
  data: { type: Array as PropType<ProTableData>, default: () => [] },
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

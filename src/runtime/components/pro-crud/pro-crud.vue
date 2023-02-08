<template>
  <div>
    <pro-table></pro-table>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import ProTable from '../pro-table/pro-table.vue'
import type { ProCrudColumn } from './types'

defineProps({
  /** 表格列配置 */
  columns: { type: Array as PropType<ProCrudColumn[]>, default: () => [] },
})
</script>

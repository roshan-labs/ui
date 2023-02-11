<template>
  <div v-loading="loading">
    <el-table v-bind="$attrs" :data="data">
      <el-table-column v-for="column in columns" :key="column.prop" v-bind="column">
        <template v-if="column.slots?.header" #header="slotProps">
          <slot
            v-if="typeof column.slots?.header === 'string'"
            :name="column.slots?.header"
            v-bind="slotProps"
          />
          <component
            :is="column.slots?.header(slotProps)"
            v-if="typeof column.slots?.header === 'function'"
          />
        </template>
        <template v-if="column.slots?.default" #default="slotProps">
          <slot
            v-if="typeof column.slots?.default === 'string'"
            :name="column.slots?.default"
            v-bind="slotProps"
          />
          <component
            :is="column.slots?.default(slotProps)"
            v-if="typeof column.slots?.default === 'function'"
          />
        </template>
      </el-table-column>
      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
      <template v-if="$slots.empty" #empty>
        <slot name="empty" />
      </template>
    </el-table>
    <div v-if="paginationProps" class="pagination">
      <el-pagination v-bind="paginationProps" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import { ElTable, ElTableColumn, ElPagination, vLoading } from 'element-plus'

import type { ProTableData, ProTableColumn, ProTablePagination } from './types'

const props = defineProps({
  /** 数据集 */
  data: { type: Array as PropType<ProTableData>, default: () => [] },
  /** 表格列配置 */
  columns: { type: Array as PropType<ProTableColumn[]>, default: () => [] },
  /** 分页配置 */
  pagination: { type: [Boolean, Object] as PropType<false | ProTablePagination>, default: false },
  /** 加载状态 */
  loading: { type: Boolean },
})

const paginationProps = computed(() =>
  props.pagination ? { layout: 'total, prev, pager, next', ...props.pagination } : false
)
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
</style>

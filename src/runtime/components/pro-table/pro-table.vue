<template>
  <div v-loading="loading">
    <el-table v-bind="$attrs">
      <el-table-column v-for="item in columns" :key="item.prop" v-bind="item">
        <template v-if="item.slots?.header" #header>
          <slot :name="item.headerSlot" />
        </template>
        <template v-if="item.slot" #default="slotProps">
          <slot :name="item.slot" v-bind="slotProps" />
        </template>
      </el-table-column>
    </el-table>
    <div v-if="defaultPagination" class="pagination">
      <el-pagination
        v-bind="defaultPagination"
        @update:current-page="updateCurrentPage"
        @update:page-size="updatePageSize"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import { ElTable, ElTableColumn, ElPagination, vLoading } from 'element-plus'

import type { DataTableColumn, DataTablePagination } from './types'

const props = defineProps({
  /** 表格列配置 */
  columns: { type: Array as PropType<DataTableColumn[]>, default: () => [] },
  /** 分页配置 */
  pagination: { type: [Boolean, Object] as PropType<false | DataTablePagination>, default: false },
  /** 加载状态 */
  loading: { type: Boolean },
})

const defaultPagination = computed(() =>
  !props.pagination
    ? false
    : {
        ...props.pagination,
        layout: 'total, prev, pager, next',
      }
)

const updateCurrentPage = (value: number) => {
  if (defaultPagination.value) {
    defaultPagination.value.updateCurrentPage?.(value)
  }
}

const updatePageSize = (value: number) => {
  if (defaultPagination.value) {
    defaultPagination.value.updatePageSize?.(value)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
</style>

<template>
  <div v-loading="loading">
    <el-table v-bind="$attrs">
      <el-table-column v-for="item in columns" :key="item.prop" v-bind="item">
        <template v-if="item.headerSlot" #header>
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
import type { TableProps } from 'element-plus'
import { computed } from 'vue'
import { ElTable, ElTableColumn, ElPagination, vLoading } from 'element-plus'

import type { DataTableColumn, Pagination } from './types'

interface Props extends Partial<TableProps<unknown>> {
  /** 表格列配置 */
  columns?: DataTableColumn[]
  /**
   * 分页配置，同 ElPagination 属性
   * 新增两个方法：updateCurrentPage、updatePageSize
   * 响应 currentPage 和 pageSize 变化
   */
  pagination?: Pagination
  /** 加载状态 */
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  pagination: false,
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

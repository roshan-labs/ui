<template>
  <div>
    <pro-form v-if="searchVisible" v-bind="searchProps" />
    <el-table v-loading="loading" v-bind="$attrs" :data="data">
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
      <el-pagination
        v-bind="paginationProps"
        :current-page="currentPage"
        @update:current-page="updateCurrentPage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { toRef, ref, computed, watchEffect } from 'vue'
import { ElTable, ElTableColumn, ElPagination, vLoading } from 'element-plus'

import ProForm from '../pro-form/pro-form.vue'
import type { ProCrudData, ProCrudColumn, ProCrudSearch, ProCrudPagination } from './types'
import { useRenderSearch } from './composables/use-render-search'

const props = defineProps({
  /** 数据集 */
  data: { type: Array as PropType<ProCrudData>, default: () => [] },
  /** 表格列配置 */
  columns: { type: Array as PropType<ProCrudColumn[]>, default: () => [] },
  /** 查询表单操作配置 */
  search: { type: Object as PropType<ProCrudSearch>, default: () => ({}) },
  /** 分页配置 */
  pagination: { type: [Boolean, Object] as PropType<false | ProCrudPagination>, default: false },
  /** 加载状态 */
  loading: { type: Boolean },
})

const { searchVisible, searchProps } = useRenderSearch(
  toRef(props, 'columns'),
  toRef(props, 'search')
)

const currentPage = ref(1)
const pageSize = ref(10)

const paginationProps = computed(() =>
  props.pagination ? { layout: 'total, prev, pager, next', ...props.pagination } : false
)

const updateCurrentPage = (value: number) => {
  currentPage.value = value
}

watchEffect(() => {
  if (props.pagination) {
    if (typeof props.pagination.currentPage !== 'undefined') {
      currentPage.value = props.pagination.currentPage
    }

    if (typeof props.pagination.pageSize !== 'undefined') {
      pageSize.value = props.pagination.pageSize
    }
  }
})
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
</style>

<template>
  <div>
    <pro-form v-if="searchVisible" v-bind="searchProps">
      <template #action="slotProps">
        <el-button :icon="Refresh" @click="slotProps.reset">{{ slotProps.resetText }}</el-button>
        <el-button type="primary" :icon="Search" @click="slotProps.submit">{{
          slotProps.submitText
        }}</el-button>
        <el-button
          v-if="searchCollapse"
          type="primary"
          :icon="collapse ? ArrowDown : ArrowUp"
          text
          @click="changeCollapse"
        >
          {{ collapse ? '展开' : '收起' }}
        </el-button>
      </template>
    </pro-form>
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
    <div v-if="pagination" class="pagination">
      <el-pagination v-bind="paginationProps" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { toRef } from 'vue'
import { ElTable, ElTableColumn, ElPagination, ElButton, vLoading } from 'element-plus'
import { Search, Refresh, ArrowUp, ArrowDown } from '@element-plus/icons-vue'

import ProForm from '../pro-form/pro-form.vue'
import type {
  ProCrudData,
  ProCrudColumn,
  ProCrudSearch,
  ProCrudPagination,
  ProCrudSearchRequest,
} from './types'
import { useRenderSearch } from './composables/use-render-search'
import { useRenderPagination } from './composables/use-render-pagination'

const props = defineProps({
  /** 数据集 */
  data: { type: Array as PropType<ProCrudData>, default: () => [] },
  /** 表格列配置 */
  columns: { type: Array as PropType<ProCrudColumn[]>, default: () => [] },
  /** 查询表单配置 */
  search: { type: Object as PropType<ProCrudSearch>, default: () => ({}) },
  /** 查询表单请求 */
  searchRequest: { type: Function as PropType<ProCrudSearchRequest> },
  /** 分页配置 */
  pagination: { type: [Boolean, Object] as PropType<false | ProCrudPagination>, default: false },
  /** 加载状态 */
  loading: { type: Boolean },
})

const emit = defineEmits(['update:current-page', 'update:page-size'])

const { collapse, searchVisible, searchCollapse, searchProps, changeCollapse } = useRenderSearch(
  toRef(props, 'columns'),
  toRef(props, 'search'),
  props.searchRequest
)

const { paginationProps } = useRenderPagination(toRef(props, 'pagination'), emit)
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
</style>

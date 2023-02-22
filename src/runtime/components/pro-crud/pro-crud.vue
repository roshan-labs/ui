<template>
  <div class="pro-crud">
    <pro-form v-if="searchVisible" v-bind="searchProps">
      <template #action="slotProps">
        <el-button :icon="Refresh" @click="slotProps.reset">{{ slotProps.resetText }}</el-button>
        <el-button
          type="primary"
          :icon="Search"
          :loading="slotProps.loading"
          @click="slotProps.submit"
          >{{ slotProps.submitText }}</el-button
        >
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
    <div v-if="toolbarVisible" class="pro-crud__toolbar">
      <div v-if="title" class="pro-crud__toolbar-title">{{ title }}</div>
    </div>
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
    <div v-if="pagination" class="pro-crud__pagination">
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
import { useToolbar } from './composables/use-toolbar'

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
  /** 表格标题 */
  title: { type: String, default: '' },
})

const emit = defineEmits(['update:current-page', 'update:page-size'])

const { collapse, searchVisible, searchCollapse, searchProps, changeCollapse } = useRenderSearch(
  toRef(props, 'columns'),
  toRef(props, 'search'),
  props.searchRequest
)
const { paginationProps } = useRenderPagination(toRef(props, 'pagination'), emit)
const { toolbarVisible } = useToolbar(toRef(props, 'title'))
</script>

<style scoped>
.pro-crud__toolbar {
  display: flex;
  align-items: center;
  height: 32px;
  margin-bottom: 16px;
}

.pro-crud__toolbar-title {
  font-size: 16px;
  color: #000000;
}

.pro-crud__pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
</style>

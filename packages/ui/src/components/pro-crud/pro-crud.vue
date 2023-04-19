<template>
  <div class="pro-crud">
    <!-- SEARCH -->
    <pro-form v-if="searchVisible" ref="searchRef" v-bind="searchProps">
      <template #action="slotProps">
        <el-space>
          <el-button
            :icon="RefreshRight"
            :disabled="slotProps.loading"
            @click="clickReset(slotProps.reset, slotProps.submit)"
          >
            {{ slotProps.resetText }}
          </el-button>
          <el-button
            type="primary"
            :icon="Search"
            :loading="slotProps.loading"
            @click="clickSearch(slotProps.submit)"
          >
            {{ slotProps.submitText }}
          </el-button>
          <el-button
            v-if="searchCollapse"
            type="primary"
            :icon="collapse ? ArrowDown : ArrowUp"
            link
            @click="changeCollapse"
          >
            {{ collapse ? '展开' : '收起' }}
          </el-button>
        </el-space>
      </template>
    </pro-form>
    <!-- TOOLBAR -->
    <div v-if="toolbarVisible" class="pro-crud__toolbar">
      <div v-if="title" class="pro-crud__toolbar-title">{{ title }}</div>
      <div class="pro-crud__toolbar-actions">
        <el-space class="pro-crud__toolbar-items" size="large">
          <div v-if="$slots.toolbar">
            <slot name="toolbar" v-bind="{ selection: selectionList }" />
          </div>
          <el-button v-if="createVisible" type="primary" :icon="Plus" @click="openCreateDialog">
            {{ createButtonText }}
          </el-button>
          <el-space size="default">
            <el-tooltip v-if="actions.refresh" content="刷新" placement="top">
              <el-icon
                class="pro-crud__toolbar-action"
                :size="18"
                color="#000000"
                @click="refreshRequest"
              >
                <Refresh />
              </el-icon>
            </el-tooltip>
            <el-tooltip v-if="actions.size" content="密度" placement="top">
              <el-dropdown trigger="click" @command="changeSize">
                <el-icon class="pro-crud__toolbar-action" :size="18" color="#000000">
                  <DCaret />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-item
                    v-for="option in sizeOptions"
                    :key="option.value"
                    :class="{ 'pro-crud__toolbar-size-active': sizeModel === option.value }"
                    :command="option.value"
                  >
                    {{ option.label }}
                  </el-dropdown-item>
                </template>
              </el-dropdown>
            </el-tooltip>
            <el-tooltip v-if="actions.setting" content="列设置" placement="top">
              <el-icon
                class="pro-crud__toolbar-action"
                :size="18"
                color="#000000"
                @click="settingVisible = true"
              >
                <Setting />
              </el-icon>
            </el-tooltip>
          </el-space>
        </el-space>
      </div>
    </div>
    <!-- INFO -->
    <el-alert
      v-if="selectionList.length > 0"
      class="pro-crud__info"
      :title="selectionInfo"
      close-text="取消选择"
      @close="clearSelection"
    />
    <!-- TABLE -->
    <el-table
      ref="tableRef"
      v-loading="searchLoading"
      v-bind="$attrs"
      :data="data"
      :size="sizeModel"
      :border="border"
      @selection-change="onSelectionChange"
    >
      <el-table-column v-for="column in filterColumns" :key="column.prop" v-bind="column">
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
      <el-table-column v-if="actionsColumnVisible" v-bind="actionsColumnProps">
        <template #default="{ $index, row }">
          <slot name="actions-column-view" v-bind="{ row, size, view: () => viewRow($index) }">
            <el-button
              v-if="viewActionVisible"
              type="primary"
              :size="sizeModel"
              link
              @click="viewRow($index)"
            >
              {{ actionsColumnConfig.viewText }}
            </el-button>
          </slot>
          <slot name="actions-column-edit" v-bind="{ row, size, edit: () => editRow($index) }">
            <el-button
              v-if="editVisible"
              type="primary"
              :size="sizeModel"
              link
              @click="editRow($index)"
            >
              {{ actionsColumnConfig.editText }}
            </el-button>
          </slot>
          <slot
            name="actions-column-remove"
            v-bind="{ row, size, remove: () => removeRow($index) }"
          >
            <el-button
              v-if="actionsColumnConfig.remove"
              type="primary"
              :size="sizeModel"
              link
              @click="removeRow($index)"
            >
              {{ actionsColumnConfig.removeText }}
            </el-button>
          </slot>
          <!-- 自定义操作列插槽 -->
          <slot name="actions-column" v-bind="{ row, size }" />
        </template>
      </el-table-column>
      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
      <template v-if="$slots.empty" #empty>
        <slot name="empty" />
      </template>
    </el-table>
    <!-- PAGINATION -->
    <div v-if="pagination" class="pro-crud__pagination">
      <el-pagination v-bind="paginationProps" />
    </div>
    <!-- CREATE DIALOG -->
    <create-dialog
      v-model="createDialogVisible"
      :title="createTitle"
      :form-props="createFormProps"
      :create-request="createRequest"
      :refresh-request="refreshRequest"
    />
    <!-- SETTING DIALOG -->
    <show-setting v-model="settingVisible" :columns="filterColumns" />
    <!-- VIEW DIALOG -->
    <view-dialog v-model="viewVisible" :options="viewOptions" :row="selectedViewRow || {}" />
    <!-- EDIT DIALOG -->
    <edit-dialog
      v-model="editDialogVisible"
      :title="editDialogTitle"
      :row="selectedRow"
      :form-props="editFormProps"
      :edit-request="editRequest"
      :refresh-request="refreshRequest"
    />
  </div>
</template>

<script lang="ts" setup>
import type { ComponentSize, TableInstance } from 'element-plus'
import { ref, toRef, defineAsyncComponent } from 'vue'
import {
  ElTable,
  ElTableColumn,
  ElPagination,
  ElButton,
  ElSpace,
  ElIcon,
  ElTooltip,
  ElDropdown,
  ElDropdownItem,
  ElAlert,
  vLoading,
} from 'element-plus'
import {
  Search,
  RefreshRight,
  ArrowUp,
  ArrowDown,
  Plus,
  Refresh,
  Setting,
  DCaret,
} from '@element-plus/icons-vue'
import { useVModel } from '@vueuse/core'

import type { ProFormInstance, ProFormModelValue } from '../pro-form/types'
import ProForm from '../pro-form/pro-form.vue'
import type {
  ProCrudData,
  ProCrudColumn,
  ProCrudSearch,
  ProCrudPagination,
  ProCrudCreate,
  ProCrudActions,
  ProCrudActionsColumn,
  ProCrudEdit,
} from './types'
import { useActionsColumn } from './composables/use-actions-column'
import { useSearch } from './composables/use-search'
import { usePagination } from './composables/use-pagination'
import { useToolbar } from './composables/use-toolbar'
import { useCreate } from './composables/use-create'
import { useSetting } from './composables/use-setting'
import { useSize } from './composables/use-size'
import { useTable } from './composables/use-table'
import { useView } from './composables/use-view'
import { useRemove } from './composables/use-remove'
import { useEdit } from './composables/use-edit'
import { useSelection } from './composables/use-selection'

export interface Props {
  /** 数据集 */
  data?: ProCrudData
  /** 表格列配置 */
  columns?: ProCrudColumn[]
  /** 表格操作列配置 */
  actionsColumn?: ProCrudActionsColumn
  /** 密度 */
  size?: ComponentSize
  /** 分页配置 */
  pagination?: ProCrudPagination
  /** 控件配置 */
  actions?: ProCrudActions
  /** 表格标题 */
  title?: string
  /** 查询表单配置 */
  search?: ProCrudSearch
  /** 查询表单字段绑定 v-model */
  searchFields?: ProFormModelValue
  /** 新增表单配置 */
  create?: ProCrudCreate
  /** 编辑表单配置 */
  edit?: ProCrudEdit
  /** 是否开启多选 */
  selection?: boolean
  /** 多选列宽度 */
  selectionWidth?: number | string
  /** 多选列是否固定 */
  selectionFixed?: boolean
  /** 带边框 */
  border?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  columns: () => [],
  actionsColumn: () => ({}),
  size: 'default',
  actions: () => ({}),
  title: '',
  search: () => ({}),
  searchFields: () => ({}),
  create: () => ({}),
  edit: () => ({}),
})

const emit = defineEmits([
  'update:pagination',
  'update:size',
  'update:searchFields',
  'create',
  'search',
  'remove',
  'edit',
])

const CreateDialog = defineAsyncComponent(() => import('./components/create-dialog.vue'))
const ShowSetting = defineAsyncComponent(() => import('./components/show-setting.vue'))
const ViewDialog = defineAsyncComponent(() => import('./components/view-dialog.vue'))
const EditDialog = defineAsyncComponent(() => import('./components/edit-dialog.vue'))

const searchRef = ref<ProFormInstance | null>(null)
const tableRef = ref<TableInstance | null>(null)
const searchLoading = ref(false)
const columnsRef = toRef(props, 'columns')
const actionsRef = toRef(props, 'actions')
const dataRef = toRef(props, 'data')
const actionsColumnRef = toRef(props, 'actionsColumn')
const searchFieldsModel = useVModel(props, 'searchFields', emit, { passive: true })

const { actionsColumnVisible, actionsColumnProps, actionsColumnConfig } =
  useActionsColumn(actionsColumnRef)

const { paginationProps, currentPage, pageSize, setPageConfig } = usePagination(
  searchRef,
  searchLoading,
  toRef(props, 'pagination'),
  emit
)

const {
  collapse,
  searchVisible,
  searchCollapse,
  searchProps,
  changeCollapse,
  refreshRequest,
  clickSearch,
  clickReset,
} = useSearch(
  searchRef,
  searchFieldsModel,
  searchLoading,
  columnsRef,
  toRef(props, 'search'),
  currentPage,
  pageSize,
  emit,
  setPageConfig
)

const {
  createDialogVisible,
  createVisible,
  createButtonText,
  createTitle,
  createFormProps,
  openCreateDialog,
  createRequest,
} = useCreate(toRef(props, 'create'), columnsRef, emit)

const { toolbarVisible } = useToolbar(toRef(props, 'title'), createVisible, actionsRef)

const { settingVisible } = useSetting()

const { sizeModel, sizeOptions, changeSize } = useSize(toRef(props, 'size'), emit)

const { removeRow } = useRemove(dataRef, emit, refreshRequest)

const {
  selectedRow,
  editDialogVisible,
  editDialogTitle,
  editVisible,
  editFormProps,
  editRow,
  editRequest,
} = useEdit(toRef(props, 'edit'), dataRef, columnsRef, emit)

const { selectionList, selectionInfo, selectionColumn, onSelectionChange, clearSelection } =
  useSelection(
    tableRef,
    toRef(props, 'selection'),
    toRef(props, 'selectionWidth'),
    toRef(props, 'selectionFixed'),
    toRef(props, 'border')
  )

const { filterColumns } = useTable(columnsRef, selectionColumn)

const { viewActionVisible, viewVisible, viewOptions, selectedViewRow, viewRow } = useView(
  dataRef,
  filterColumns
)

defineExpose({
  // 原 ElTable 方法
  clearSelection: tableRef.value!.clearSelection,
  getSelectionRows: tableRef.value!.getSelectionRows,
  toggleRowSelection: tableRef.value!.toggleRowSelection,
  toggleAllSelection: tableRef.value!.toggleAllSelection,
  toggleRowExpansion: tableRef.value!.toggleRowExpansion,
  setCurrentRow: tableRef.value!.setCurrentRow,
  clearSort: tableRef.value!.clearSort,
  clearFilter: tableRef.value!.clearFilter,
  doLayout: tableRef.value!.doLayout,
  sort: tableRef.value!.sort,
  scrollTo: tableRef.value!.scrollTo,
  setScrollTop: tableRef.value!.setScrollTop,
  setScrollLeft: tableRef.value!.setScrollLeft,
  /** 刷新查询 */
  refreshSearch: refreshRequest,
})
</script>

<script lang="ts">
export default {
  name: 'ProCrud',
  inheritAttrs: false,
}
</script>

<style>
.pro-crud__toolbar {
  display: flex;
  align-items: center;
  height: 32px;
  margin-bottom: 16px;
}

.pro-crud__info {
  margin-bottom: 16px;
}

.pro-crud__toolbar-title {
  font-size: 16px;
  color: #000000;
}

.pro-crud__toolbar-actions {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  overflow: auto;
}

.pro-crud__toolbar-items .el-space__item:last-child {
  margin-right: 0 !important;
}

.pro-crud__toolbar-size-active {
  color: var(--el-color-primary);
}

.pro-crud__toolbar-action {
  vertical-align: middle;
  cursor: pointer;
}

.pro-crud__pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
</style>

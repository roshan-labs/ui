<template>
  <div class="pro-crud">
    <!-- SEARCH -->
    <pro-form v-if="searchVisible" ref="searchRef" v-bind="searchProps">
      <template #action="slotProps">
        <el-space>
          <el-button :icon="RefreshRight" @click="slotProps.reset">{{
            slotProps.resetText
          }}</el-button>
          <el-button
            type="primary"
            :icon="Search"
            :loading="slotProps.loading"
            @click="clickSearch(slotProps.submit)"
            >{{ slotProps.submitText }}</el-button
          >
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
        <slot name="toolbar" />
        <el-space class="pro-crud__toolbar-items" size="large">
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
                    >{{ option.label }}</el-dropdown-item
                  >
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
    <!-- TABLE -->
    <el-table v-loading="searchLoading" v-bind="$attrs" :data="data" :size="sizeModel">
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
          <el-button
            v-if="actionsColumnConfig.view"
            type="primary"
            :size="sizeModel"
            link
            @click="viewRow($index)"
            >{{ actionsColumnConfig.viewText }}</el-button
          >
          <el-button
            v-if="actionsColumnConfig.remove"
            type="primary"
            :size="sizeModel"
            link
            @click="removeRow($index)"
            >{{ actionsColumnConfig.removeText }}</el-button
          >
          <el-button
            v-if="editVisible"
            type="primary"
            :size="sizeModel"
            link
            @click="editRow($index)"
            >{{ actionsColumnConfig.editText }}</el-button
          >
          <!-- 自定义操作列插槽 -->
          <slot v-if="$slots.actionsColumn" name="actionsColumn" v-bind="{ row, size }" />
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
    <view-dialog v-model="viewVisible" :options="viewOptions" />
    <!-- EDIT DIALOG -->
    <edit-dialog
      v-model="editDialogVisible"
      :title="editDialogTitle"
      :form-props="editFormProps"
      :edit-request="editRequest"
    />
  </div>
</template>

<script lang="ts" setup>
import type { ComponentSize } from 'element-plus'
import type { PropType } from 'vue'
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

import ProForm from '../pro-form/pro-form.vue'
import type {
  ProCrudData,
  ProCrudColumn,
  ProCrudSearch,
  ProCrudPagination,
  ProCrudCreate,
  ProCrudActions,
  ProCrudActionsColumn,
  ProFormInstance,
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

const CreateDialog = defineAsyncComponent(() => import('./components/create-dialog.vue'))
const ShowSetting = defineAsyncComponent(() => import('./components/show-setting.vue'))
const ViewDialog = defineAsyncComponent(() => import('./components/view-dialog.vue'))
const EditDialog = defineAsyncComponent(() => import('./components/edit-dialog.vue'))

const props = defineProps({
  /** 数据集 */
  data: { type: Array as PropType<ProCrudData>, default: () => [] },
  /** 表格列配置 */
  columns: { type: Array as PropType<ProCrudColumn[]>, default: () => [] },
  /** 表格操作列配置 */
  actionsColumn: { type: Object as PropType<ProCrudActionsColumn>, default: () => ({}) },
  /** 密度 */
  size: { type: String as PropType<ComponentSize>, default: 'default' },
  /** 分页配置 */
  pagination: { type: Object as PropType<ProCrudPagination> },
  /** 控件配置 */
  actions: { type: Object as PropType<ProCrudActions>, default: () => ({}) },
  /** 表格标题 */
  title: { type: String, default: '' },
  /** 查询表单配置 */
  search: { type: Object as PropType<ProCrudSearch>, default: () => ({}) },
  /** 新增表单配置 */
  create: { type: Object as PropType<ProCrudCreate>, default: () => ({}) },
  /** 编辑表单配置 */
  edit: { type: Object as PropType<ProCrudEdit>, default: () => ({}) },
})

const emit = defineEmits(['update:pagination', 'update:size', 'create', 'search', 'remove', 'edit'])

const searchRef = ref<ProFormInstance | null>(null)
const searchLoading = ref(false)
const columnsRef = toRef(props, 'columns')
const actionsRef = toRef(props, 'actions')
const dataRef = toRef(props, 'data')
const actionsColumnRef = toRef(props, 'actionsColumn')

const { actionsColumnVisible, actionsColumnProps, actionsColumnConfig } =
  useActionsColumn(actionsColumnRef)

const { filterColumns } = useTable(columnsRef)

const { paginationProps, currentPage, pageSize } = usePagination(
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
} = useSearch(
  searchRef,
  searchLoading,
  columnsRef,
  toRef(props, 'search'),
  currentPage,
  pageSize,
  emit
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

const { viewVisible, viewOptions, viewRow } = useView(dataRef, filterColumns)

const { removeRow } = useRemove(dataRef, emit, refreshRequest)

const { editDialogVisible, editDialogTitle, editVisible, editFormProps, editRow, editRequest } =
  useEdit(toRef(props, 'edit'), dataRef, columnsRef, emit)
</script>

<style>
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

import type { Ref } from 'vue'
import { computed } from 'vue'

import type { ProCrudActionsColumn, ProCrudColumn } from '../types'

/** 处理操作列 */
export const useActionsColumn = (actionsColumn: Ref<ProCrudActionsColumn>) => {
  /** 操作列 ElTableColumn 属性 */
  const actionsColumnProps = computed<ProCrudColumn>(() => ({
    label: actionsColumn.value.label || '操作',
    ...actionsColumn.value,
  }))

  /** 操作列是否禁用 */
  const actionsColumnVisible = computed(() => !(actionsColumn.value.hide ?? false))

  /** 操作列配置 */
  const actionsColumnConfig = computed(() => ({
    viewText: actionsColumn.value.viewText ?? '查看',
    remove: actionsColumn.value.remove ?? false,
    removeText: actionsColumn.value.removeText ?? '删除',
    editText: actionsColumn.value.editText ?? '编辑',
  }))

  return {
    actionsColumnProps,
    actionsColumnVisible,
    actionsColumnConfig,
  }
}

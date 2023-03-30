import { ref, computed } from 'vue'

import type { Ref } from 'vue'
import type { TableInstance } from 'element-plus'

import type { Data, ProCrudColumn } from '../types'
import { isUndefined } from '../../../utils'

/** 多选 */
export const useSelection = (
  tableRef: Ref<TableInstance | null>,
  selection: Ref<boolean>,
  selectionWidth: Ref<number | string | undefined>,
  selectionFixed: Ref<boolean>,
  border: Ref<Boolean>
) => {
  const selectionList = ref<Data[]>([])

  const selectionInfo = computed(() =>
    selectionList.value.length > 0 ? `已选择 ${selectionList.value.length} 项` : ''
  )

  /** 多选列配置 */
  const selectionColumn = computed<ProCrudColumn | null>(() => {
    if (selection.value) {
      const column: ProCrudColumn = { type: 'selection', fixed: selectionFixed.value }

      if (!isUndefined(selectionWidth.value)) {
        column.width = selectionWidth.value
      }

      if (border.value) {
        column.align = 'center'
      }

      return column
    }

    return null
  })

  const onSelectionChange = (value: Data[]) => {
    selectionList.value = value
  }

  const clearSelection = () => {
    tableRef.value?.clearSelection()
  }

  return {
    selectionList,
    selectionInfo,
    selectionColumn,
    onSelectionChange,
    clearSelection,
  }
}

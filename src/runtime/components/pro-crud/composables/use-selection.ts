import { ref, computed } from 'vue'

import type { Ref } from 'vue'
import type { TableInstance } from 'element-plus'

import type { Data } from '../types'

/** 多选 */
export const useSelection = (tableRef: Ref<TableInstance | null>) => {
  const selection = ref<Data[]>([])

  const selectionInfo = computed(() =>
    selection.value.length > 0 ? `已选择 ${selection.value.length} 项` : ''
  )

  const onSelectionChange = (value: Data[]) => {
    selection.value = value
  }

  const clearSelection = () => {
    tableRef.value?.clearSelection()
  }

  return {
    selection,
    selectionInfo,
    onSelectionChange,
    clearSelection,
  }
}

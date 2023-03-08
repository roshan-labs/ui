import type { Ref } from 'vue'
import { ref, computed } from 'vue'

import type { ProCrudData, ProCrudColumn, ProCrudViewOption, Data } from '../types'

/**
 * 数据查看
 */
export const useView = (data: Ref<ProCrudData>, columns: Ref<ProCrudColumn[]>) => {
  /** 是否显示查看数据对话框 */
  const viewVisible = ref(false)

  /** 选中的一条数据 */
  const selectedRow: Ref<Data | null> = ref(null)

  /** 数据查看配置 */
  const viewOptions = computed<ProCrudViewOption[]>(() => {
    if (selectedRow.value) {
      const row = selectedRow.value
      return columns.value.map((column) => {
        const value = row[column.prop ?? ''] ?? ''

        return {
          label: column.label ?? '',
          value,
        }
      })
    }

    return []
  })

  /** 打开查看对话框 */
  const viewRow = (index: number) => {
    const row = data.value[index]

    if (row) {
      selectedRow.value = row
      viewVisible.value = true
    }
  }

  return {
    viewVisible,
    viewOptions,
    viewRow,
  }
}

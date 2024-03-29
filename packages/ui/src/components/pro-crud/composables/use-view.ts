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
  const selectedViewRow: Ref<Data | null> = ref(null)

  /** 查看功能是否开启 */
  const viewActionVisible = computed(() => columns.value.some((column) => column.view ?? true))

  /** 查看数据配置 */
  const viewOptions = computed<ProCrudViewOption[]>(() => {
    if (selectedViewRow.value) {
      return columns.value
        .filter((column) => !column.type && (column.view ?? true))
        .map((column) => ({
          label: column.label || '',
          prop: column.prop || '',
        }))
    }

    return []
  })

  /** 打开查看对话框 */
  const viewRow = (index: number) => {
    const row = data.value[index]

    if (row) {
      selectedViewRow.value = row
      viewVisible.value = true
    }
  }

  return {
    selectedViewRow,
    viewActionVisible,
    viewVisible,
    viewOptions,
    viewRow,
  }
}

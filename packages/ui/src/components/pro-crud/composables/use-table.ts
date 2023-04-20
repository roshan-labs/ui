import type { Ref } from 'vue'
import { computed } from 'vue'

import type { ProCrudColumn } from '../types'
import { isUndefined } from '../../../utils'

export const useTable = (
  columns: Ref<ProCrudColumn[]>,
  selectionColumn: Ref<ProCrudColumn | null>
) => {
  /** 表格列配置 */
  const filterColumns = computed(() => {
    const items = columns.value.filter((column) => (isUndefined(column.hide) ? true : !column.hide))

    return selectionColumn.value ? [selectionColumn.value, ...items] : items
  })

  return {
    filterColumns,
  }
}

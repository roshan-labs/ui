import type { Ref } from 'vue'
import { computed } from 'vue'

import type { ProCrudColumn } from '../types'
import { isUndefined } from '../../../utils'

export const useTable = (columns: Ref<ProCrudColumn[]>) => {
  const filterColumns = computed(() =>
    columns.value.filter((column) => (isUndefined(column.hide) ? true : !column.hide))
  )

  return {
    filterColumns,
  }
}

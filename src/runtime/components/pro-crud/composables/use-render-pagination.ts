import type { Ref } from 'vue'
import { ref, computed } from 'vue'

import type { ProCrudPagination } from '../types'
import { isUndefined } from '../../../utils'

export const useRenderPagination = (
  pagination: Ref<ProCrudPagination | false>,
  emit: (event: 'update:current-page' | 'update:page-size', ...args: any[]) => void
) => {
  const currentPage = ref(1)
  const pageSize = ref(10)

  const paginationProps = computed(() => {
    let result: Record<string, any> = {}

    if (pagination.value) {
      result = { layout: 'total, prev, pager, next', ...pagination.value }

      if (!isUndefined(pagination.value.currentPage)) {
        result.currentPage = currentPage.value
        result['onUpdate:currentPage'] = updateCurrentPage
      }

      if (!isUndefined(pagination.value.pageSize)) {
        result.pageSize = pageSize.value
        result['onUpdate:pageSize'] = updatePageSize
      }
    }

    return result
  })

  const updateCurrentPage = (value: number) => {
    currentPage.value = value
    emit('update:current-page', value)
  }

  const updatePageSize = (value: number) => {
    pageSize.value = value
    emit('update:page-size', value)
  }

  return {
    paginationProps,
  }
}

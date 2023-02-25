import type { Ref } from 'vue'
import { ref, computed } from 'vue'

import type { ProCrudPagination, ProFormInstance } from '../types'
import { isUndefined } from '../../../utils'

export const usePagination = (
  searchRef: Ref<ProFormInstance | null>,
  searchLoading: Ref<boolean>,
  pagination: Ref<ProCrudPagination | false>,
  emit: (event: 'update:current-page' | 'update:page-size', ...args: any[]) => void
) => {
  const currentPage = ref(1)
  const pageSize = ref(10)

  const paginationProps = computed<ProCrudPagination>(() => {
    let config: ProCrudPagination = {}

    if (pagination.value) {
      config = {
        ...pagination.value,
        layout: pagination.value.layout ?? 'total, prev, pager, next',
        disabled: pagination.value.disabled ?? searchLoading.value,
      }

      if (!isUndefined(pagination.value.currentPage)) {
        config.currentPage = currentPage.value
        config['onUpdate:currentPage'] = updateCurrentPage
      }

      if (!isUndefined(pagination.value.pageSize)) {
        config.pageSize = pageSize.value
        config['onUpdate:pageSize'] = updatePageSize
      }
    }

    return config
  })

  const updateCurrentPage = (value: number) => {
    currentPage.value = value
    searchRef.value?.submit()
    emit('update:current-page', value)
  }

  const updatePageSize = (value: number) => {
    pageSize.value = value
    searchRef.value?.submit()
    emit('update:page-size', value)
  }

  return {
    currentPage,
    pageSize,
    paginationProps,
  }
}

import type { Ref } from 'vue'
import { ref, computed, watch } from 'vue'

import type { ProCrudPagination, ProFormInstance } from '../types'
import { isUndefined } from '../../../utils'

export const usePagination = (
  searchRef: Ref<ProFormInstance | null>,
  searchLoading: Ref<boolean>,
  pagination: Ref<ProCrudPagination | undefined>,
  emit: (event: 'update:pagination', ...args: any[]) => void
) => {
  const currentPage = ref(1)

  watch(
    pagination,
    (value) => {
      if (typeof value?.currentPage === 'number') {
        currentPage.value = value.currentPage
      }
    },
    { immediate: true }
  )

  watch(currentPage, (value) => {
    const payload: ProCrudPagination = {
      ...pagination.value,
      currentPage: value,
    }

    emit('update:pagination', payload)
  })

  const pageSize = ref(30)

  watch(
    pagination,
    (value) => {
      if (typeof value?.pageSize === 'number') {
        pageSize.value = value.pageSize
      }
    },
    { immediate: true }
  )

  watch(pageSize, (value) => {
    const payload: ProCrudPagination = {
      ...pagination.value,
      pageSize: value,
    }

    emit('update:pagination', payload)
  })

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
  }

  const updatePageSize = (value: number) => {
    pageSize.value = value
    searchRef.value?.submit()
  }

  return {
    currentPage,
    pageSize,
    paginationProps,
  }
}

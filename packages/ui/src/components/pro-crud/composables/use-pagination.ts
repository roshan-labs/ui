import type { Ref } from 'vue'
import { ref, computed, watch } from 'vue'

import type { ProCrudPagination } from '../types'
import type { ProFormInstance } from '../../pro-form/types'
import { isUndefined } from '../../../utils'

export const usePagination = (
  searchRef: Ref<ProFormInstance | null>,
  searchLoading: Ref<boolean>,
  pagination: Ref<ProCrudPagination | undefined>,
  emit: (event: 'update:pagination', ...args: any[]) => void
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
        config['on-update:current-page'] = updateCurrentPage
      }

      if (!isUndefined(pagination.value.pageSize)) {
        config.pageSize = pageSize.value
        config['on-update:page-size'] = updatePageSize
      }
    }

    return config
  })

  /** 设置分页 */
  const setPageConfig = (init = false) => {
    const page = pagination.value

    // 初始化操作
    if (init) {
      currentPage.value = 1

      if (page) {
        if (!isUndefined(page.pageSize)) {
          pageSize.value = page.pageSize
        } else if (!isUndefined(page.pageSizes) && page.pageSizes.length > 0) {
          pageSize.value = page.pageSizes[0]
        } else {
          pageSize.value = 10
        }
      } else {
        pageSize.value = 10
      }
    } else {
      // 同步 pagination 配置
      if (page && !isUndefined(page.currentPage)) {
        currentPage.value = page.currentPage
      }

      if (page && !isUndefined(page.pageSize)) {
        pageSize.value = page.pageSize
      } else if (page && !isUndefined(page.pageSizes) && page.pageSizes.length > 0) {
        pageSize.value = page.pageSizes[0]
      }
    }
  }

  const updateCurrentPage = (value: number) => {
    currentPage.value = value
    searchRef.value?.submit()
    return true
  }

  const updatePageSize = (value: number) => {
    pageSize.value = value
    searchRef.value?.submit()
    return true
  }

  watch(currentPage, (value) => {
    const payload: ProCrudPagination = {
      ...pagination.value,
      currentPage: value,
    }

    emit('update:pagination', payload)
  })

  watch(pageSize, (value) => {
    const payload: ProCrudPagination = {
      ...pagination.value,
      pageSize: value,
    }

    emit('update:pagination', payload)
  })

  watch(
    pagination,
    () => {
      setPageConfig()
    },
    { immediate: true }
  )

  return {
    currentPage,
    pageSize,
    paginationProps,
    setPageConfig,
  }
}

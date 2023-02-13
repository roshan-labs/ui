import type { Ref } from 'vue'
import { computed } from 'vue'

import type { ProCrudColumn, ProCrudSearch } from '../types'
import type { ProFormOption, ProForm } from '../../pro-form/types'

export const useRenderSearch = (columns: Ref<ProCrudColumn[]>, search: Ref<ProCrudSearch>) => {
  const searchOptions = computed(() =>
    columns.value.reduce<ProFormOption[]>((prev, column) => {
      const { search } = column

      if (typeof search === 'boolean' && search) {
        prev.push({ type: 'input', prop: column.prop ?? '', label: column.label ?? '' })
      } else if (search) {
        prev.push({ label: column.label, ...search, prop: column.prop ?? '' })
      }

      return prev
    }, [])
  )

  const searchVisible = computed(() => searchOptions.value.length > 0)

  const searchAction = computed(() => {
    const { action = {} } = search.value

    return {
      ...action,
      submit: action.submit ?? true,
      submitText: action.submitText ?? '查询',
      reset: action.reset ?? true,
      resetText: action.resetText ?? '重置',
    }
  })

  const searchProps = computed(() => {
    const result: ProForm = {
      ...search.value,
      options: searchOptions.value,
      action: searchAction.value,
    }

    if (!search.value.inline && typeof search.value.labelWidth === 'undefined') {
      result.labelWidth = 60
    }

    return result
  })

  return {
    searchVisible,
    searchProps,
  }
}

import type { Ref } from 'vue'
import { computed } from 'vue'

import type { ProCrudColumn, ProCrudSearch } from '../types'
import type { ProFormOption } from '../../pro-form/types'

export const useRenderSearch = (columns: Ref<ProCrudColumn[]>, search: Ref<ProCrudSearch>) => {
  const searchOptions = computed(() =>
    columns.value.reduce<ProFormOption[]>((prev, column) => {
      const { search } = column

      if (typeof search === 'boolean' && search) {
        prev.push({ type: 'input', prop: column.prop ?? '', label: column.label ?? '', span: 6 })
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
      span: action.span ?? 6,
    }
  })

  const searchProps = computed(() => ({
    ...search.value,
    options: searchOptions.value,
    action: searchAction.value,
  }))

  return {
    searchVisible,
    searchProps,
  }
}

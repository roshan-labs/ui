import type { Ref } from 'vue'
import { computed } from 'vue'

import type { ProCrudColumn, ProCrudSearch, ProCrudSearchRequest } from '../types'
import type { ProFormOption, ProForm } from '../../pro-form/types'
import { isUndefined } from '../../../utils'

export const useRenderSearch = (
  columns: Ref<ProCrudColumn[]>,
  search: Ref<ProCrudSearch>,
  searchRequest?: ProCrudSearchRequest
) => {
  const searchOptions = computed(() =>
    columns.value.reduce<ProFormOption[]>((prev, column) => {
      const { search: searchProp } = column

      if (typeof searchProp === 'boolean' && searchProp) {
        const config: ProFormOption = {
          type: 'input',
          prop: column.prop ?? '',
          label: column.label ?? '',
        }

        if (!search.value.inline) {
          config.span = 6
        }

        prev.push(config)
      } else if (searchProp) {
        const config: ProFormOption = {
          label: column.label,
          ...searchProp,
          prop: column.prop ?? '',
        }

        if (!search.value.inline && isUndefined(searchProp.span)) {
          config.span = 6
        }

        prev.push(config)
      }

      return prev
    }, [])
  )

  const searchVisible = computed(() => searchOptions.value.length > 0)

  const searchAction = computed(() => {
    const { action = {} } = search.value

    if (!search.value.inline && isUndefined(action.span)) {
      action.span = 6
    }

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
      onSubmit: searchSubmit,
    }

    if (!search.value.inline && typeof search.value.labelWidth === 'undefined') {
      result.labelWidth = 60
    }

    return result
  })

  const searchSubmit: ProForm['onSubmit'] = (done, isValid, fields) => {
    if (search.value.onSubmit) {
      search.value.onSubmit(done, isValid, fields)
    }

    if (isValid) {
      if (searchRequest) {
        searchRequest({ search: fields, done })
      } else {
        done()
      }
    }
  }

  return {
    searchVisible,
    searchProps,
  }
}

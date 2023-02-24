import type { Ref } from 'vue'
import { ref, computed } from 'vue'

import type { ProCrudColumn, ProCrudSearch, ProCrudSearchRequest } from '../types'
import type { ProFormOption, ProFormProps } from '../../pro-form/types'
import { isUndefined, isBoolean } from '../../../utils'

export const useRenderSearch = (
  columns: Ref<ProCrudColumn[]>,
  search: Ref<ProCrudSearch>,
  searchRequest?: ProCrudSearchRequest
) => {
  /** 展开收起状态 */
  const collapse = ref(true)

  const searchOriginOptions = computed(() =>
    columns.value.reduce<ProFormOption[]>((prev, column) => {
      const { search: searchProp } = column

      if (isBoolean(searchProp) && searchProp) {
        const config: ProFormOption = {
          type: 'input',
          prop: column.prop,
          label: column.label ?? '',
        }

        // 非行内表单默认删格布局占位 6
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

        // 非行内表单并且未设置占位默认 6
        if (!search.value.inline && isUndefined(searchProp.span)) {
          config.span = 6
        }

        prev.push(config)
      }

      return prev
    }, [])
  )

  const searchCollapse = computed(() => {
    const { collapseCount } = search.value

    return !isUndefined(collapseCount) && searchOriginOptions.value.length > collapseCount
  })

  const searchOptions = computed(() =>
    searchCollapse.value && collapse.value
      ? searchOriginOptions.value.slice(0, search.value.collapseCount)
      : searchOriginOptions.value
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
    const result: ProFormProps = {
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

  const searchSubmit: ProFormProps['onSubmit'] = (done, isValid, fields) => {
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

  const changeCollapse = () => {
    collapse.value = !collapse.value
  }

  return {
    collapse,
    searchVisible,
    searchCollapse,
    searchProps,
    changeCollapse,
  }
}

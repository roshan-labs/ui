import type { Ref } from 'vue'
import { ref, computed } from 'vue'

import type { ProCrudColumn, ProCrudSearch, ProFormInstance } from '../types'
import type {
  ProFormOption,
  ProFormProps,
  ProFormDone,
  ProFormBeforeSubmit,
} from '../../pro-form/types'
import { isUndefined, isBoolean } from '../../../utils'

export const useSearch = (
  searchRef: Ref<ProFormInstance | null>,
  searchLoading: Ref<boolean>,
  columns: Ref<ProCrudColumn[]>,
  search: Ref<ProCrudSearch>,
  currentPage: Ref<number>,
  pageSize: Ref<number>,
  emit: (event: 'search', ...args: any[]) => void
) => {
  /** 展开收起状态 */
  const collapse = ref(true)

  /** 查询表单原始选项配置 */
  const searchOriginOptions = computed(() =>
    columns.value.reduce<ProFormOption[]>((prev, column) => {
      const { search: searchProp } = column

      if (isBoolean(searchProp) && searchProp) {
        const config: ProFormOption = {
          type: 'input',
          prop: column.prop ?? '',
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

  /** 当前状态查询表单选项配置 */
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
      beforeSubmit,
    }

    if (!search.value.inline && isUndefined(search.value.labelWidth)) {
      result.labelWidth = 60
    }

    return result
  })

  /**
   * 绑定表单 done 函数
   * 停止加载状态
   */
  const createDone = (done: ProFormDone) => {
    return () => {
      done()
      searchLoading.value = false
    }
  }

  const beforeSubmit: ProFormBeforeSubmit = (fields, isValid, done) => {
    if (isValid) {
      const doneFunc = createDone(done)

      searchLoading.value = true
      emit('search', {
        params: fields,
        currentPage: currentPage.value,
        pageSize: pageSize.value,
        done: doneFunc,
      })
    }
  }

  /**
   * 点击查询按钮
   * 这里重置分页到第一页
   */
  const clickSearch = (submit: () => void) => {
    currentPage.value = 1
    submit()
  }

  /** 刷新查询请求 */
  const refreshRequest = () => {
    if (!searchLoading.value) {
      searchRef.value?.submit()
    }
  }

  const changeCollapse = () => {
    collapse.value = !collapse.value
  }

  return {
    searchRef,
    collapse,
    searchLoading,
    searchVisible,
    searchCollapse,
    searchProps,
    refreshRequest,
    changeCollapse,
    clickSearch,
  }
}
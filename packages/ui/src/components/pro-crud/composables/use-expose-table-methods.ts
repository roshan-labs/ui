import type { Ref } from 'vue'
import type { TableInstance } from 'element-plus'

/**
 * 导出 ElTable 组件方法
 * @param tableRef ElTable 模板引用
 */
export const useExposeTableMethods = (tableRef: Ref<TableInstance | null>) => {
  const clearSelection: TableInstance['clearSelection'] = () => {
    tableRef.value?.clearSelection()
  }

  const getSelectionRows: TableInstance['getSelectionRows'] = () => {
    tableRef.value?.getSelectionRows()
  }

  const toggleRowSelection: TableInstance['toggleRowSelection'] = (...args) => {
    tableRef.value?.toggleRowSelection(...args)
  }

  const toggleAllSelection: TableInstance['toggleAllSelection'] = () => {
    tableRef.value?.toggleAllSelection()
  }

  const toggleRowExpansion: TableInstance['toggleRowExpansion'] = (...args) => {
    tableRef.value?.toggleRowExpansion(...args)
  }

  const setCurrentRow: TableInstance['setCurrentRow'] = (...args) => {
    tableRef.value?.setCurrentRow(...args)
  }

  const clearSort: TableInstance['clearSort'] = () => {
    tableRef.value?.clearSort()
  }

  const clearFilter: TableInstance['clearFilter'] = (...args) => {
    tableRef.value?.clearFilter(...args)
  }

  const doLayout: TableInstance['doLayout'] = () => {
    tableRef.value?.doLayout()
  }

  const sort: TableInstance['sort'] = (...args) => {
    tableRef.value?.sort(...args)
  }

  const scrollTo: TableInstance['scrollTo'] = (...args) => {
    tableRef.value?.scrollTo(...args)
  }

  const setScrollTop: TableInstance['setScrollTop'] = (...args) => {
    tableRef.value?.setScrollTop(...args)
  }

  const setScrollLeft: TableInstance['setScrollLeft'] = (...args) => {
    tableRef.value?.setScrollLeft(...args)
  }

  return {
    clearSelection,
    getSelectionRows,
    toggleRowSelection,
    toggleAllSelection,
    toggleRowExpansion,
    setCurrentRow,
    clearSort,
    clearFilter,
    doLayout,
    sort,
    scrollTo,
    setScrollTop,
    setScrollLeft,
  }
}

import type { ProTableColumn, ProTableData, ProTablePagination } from '../pro-table/types'
import type { ProFormOption, ProFormAction, ProForm } from '../pro-form/types'

export type ProCrudData = ProTableData

export type ProCrudColumn = ProTableColumn & {
  /** 查询表单项配置 */
  search?: boolean | ProFormOption
}

export interface ProCrudSearch extends Omit<ProForm, 'options'> {
  action?: ProFormAction
}

export type ProCrudPagination = ProTablePagination

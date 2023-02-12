import type { FormProps } from 'element-plus'

import type { ProTableColumn, ProTableData } from '../pro-table/types'
import type { ProFormOption, ProFormAction } from '../pro-form/types'

export type ProCrudData = ProTableData

export type ProCrudColumn = ProTableColumn & {
  /** 查询表单项配置 */
  search?: boolean | ProFormOption
}

export interface ProCrudSearch extends Partial<Omit<FormProps, 'model'>> {
  action?: ProFormAction
}

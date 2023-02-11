import type { ProTableColumn, ProTableData } from '../pro-table/types'
import type { ProFormOption } from '../pro-form/types'

export type ProCrudData = ProTableData

/** 表格列配置 */
export type ProCrudColumn = ProTableColumn & {
  /** 查询表单项配置 */
  search?: false | ProFormOption
}

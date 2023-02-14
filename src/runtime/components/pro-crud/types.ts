import type { TableColumnCtx, PaginationProps, PaginationEmits } from 'element-plus'

import type { ProFormOption, ProFormAction, ProForm } from '../pro-form/types'
import type { Slots } from '../../utils'

export type ProCrudData<T = any> = T[]

export type ProCrudColumn<T = any> = Partial<Omit<TableColumnCtx<T>, 'id' | 'realWidth'>> & {
  /** TableColumn prop 必填 */
  prop: string
  /** TableColumn 插槽 */
  slots?: Slots<'default' | 'header'>
  /** 查询表单项配置 */
  search?: boolean | ProFormOption
}

export type ProCrudPagination = Partial<PaginationProps> & {
  onSizeChange?: PaginationEmits['size-change']
  onCurrentChange?: PaginationEmits['current-change']
  onPrevClick?: PaginationEmits['prev-click']
  onNextClick?: PaginationEmits['next-click']
}

export interface ProCrudSearch extends Omit<ProForm, 'options'> {
  action?: ProFormAction
}

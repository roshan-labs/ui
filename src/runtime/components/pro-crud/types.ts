import type { TableColumnCtx, PaginationProps } from 'element-plus'

import type { ProFormOption, ProFormAction, ProForm } from '../pro-form/types'
import type { Slots, Writable } from '../../utils'

export type ProCrudData<T = any> = T[]

export type ProCrudColumn<T = any> = Partial<Omit<TableColumnCtx<T>, 'id' | 'realWidth'>> & {
  /** TableColumn prop 必填 */
  prop: string
  /** TableColumn 插槽 */
  slots?: Slots<'default' | 'header'>
  /** 查询表单项配置 */
  search?: boolean | ProFormOption
}

export type ProCrudPagination = Partial<Writable<PaginationProps>>

export interface ProCrudSearch extends Omit<ProForm, 'options'> {
  action?: ProFormAction
}

/** 查询表单请求 */
export type ProCrudSearchRequest = (params: {
  search: Record<string, any>
  done: () => void
}) => void

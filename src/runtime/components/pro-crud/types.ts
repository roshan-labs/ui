import type { TableColumnCtx, PaginationProps } from 'element-plus'

import type { ProFormOption, ProFormAction, ProFormProps, ProFormDone } from '../pro-form/types'
import type { Slots, Writable } from '../../utils'

/** Crud 数据 */
export type ProCrudData<T = any> = T[]

/** Crud 选项配置 */
export type ProCrudColumn<T = any> = Partial<Omit<TableColumnCtx<T>, 'id' | 'realWidth'>> & {
  /** TableColumn prop 必填 */
  prop: string
  /** TableColumn 插槽 */
  slots?: Slots<'default' | 'header'>
  /** 查询表单项配置 */
  search?: boolean | ProFormOption
  /** 新增表单项配置 */
  create?: boolean | ProFormOption
}

/** Crud 控件配置 */
export interface ProCrudActions {
  /** 是否可刷新并显示刷新控件 */
  refresh?: boolean
}

/** 分页配置 */
export type ProCrudPagination = Partial<Writable<PaginationProps>>

/** 查询表单配置 */
export interface ProCrudSearch extends Omit<ProFormProps, 'options'> {
  /** 查询按钮配置 */
  action?: ProFormAction & {
    /** 展开状态所占空间 */
    showSpan?: number
    /** 折叠状态所占空间 */
    hideSpan?: number
  }
  /** 折叠状态保留的表单项个数 */
  collapseCount?: number
}

/** 查询表单请求 */
export type ProCrudSearchRequest = (payload: {
  params: Record<string, any>
  done: ProFormDone
}) => void

/** 新增表单配置 */
export interface ProCrudCreate extends Omit<ProFormProps, 'options'> {
  /** 按钮配置 */
  action?: ProFormAction
  /** 新增按钮文本 */
  buttonText?: string
  /** 新增对话框标题 */
  title?: string
}

/** 新增提交请求 */
export type ProCrudCreateRequest = (payload: {
  params: Record<string, any>
  done: ProFormDone
}) => void

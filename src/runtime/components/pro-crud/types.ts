import type { TableColumnCtx, PaginationProps } from 'element-plus'

import type { ProFormOption, ProFormAction, ProFormProps, ProFormDone } from '../pro-form/types'
import type { Slots, Writable } from '../../utils'
import { ProForm } from '../pro-form'

/** ProForm 实例 */
export type ProFormInstance = InstanceType<typeof ProForm>

/** Crud 单条数据 */
export type Data = Record<string, any>

/** Crud 数据集合 */
export type ProCrudData<T = Data> = T[]

/** Crud 选项配置 */
export interface ProCrudColumn<T = any>
  extends Partial<Omit<TableColumnCtx<T>, 'id' | 'realWidth'>> {
  /** TableColumn 插槽 */
  slots?: Slots<'default' | 'header'>
  /** 是否隐藏此列 */
  hide?: boolean
  /** 查询表单项配置 */
  search?: boolean | ProFormOption
  /** 新增表单项配置 */
  create?: boolean | ProFormOption
  /** 编辑表单项配置 */
  edit?: boolean | ProFormOption
}

/** Crud 操作列配置 */
export interface ProCrudActionsColumn {
  /** 是否隐藏 */
  hide?: boolean
  /** 标题 */
  title?: string
  /** 是否查看表格行详情 */
  view?: boolean
  /** 查看文本 */
  viewText?: string
  /** 是否删除数据 */
  remove?: boolean
  /** 删除数据按钮文本 */
  removeText?: string
  /** 编辑数据按钮文本 */
  editText?: string
}

/** Crud 控件配置 */
export interface ProCrudActions {
  /** 是否可刷新并显示刷新控件 */
  refresh?: boolean
  /** 是否可以配置列 */
  setting?: boolean
  /** 是否可以切换表格尺寸 */
  size?: boolean
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

/** 查询数据事件 */
export type ProCrudSearchEvent = (payload: {
  params: Record<string, any>
  done: ProFormDone
  currentPage: number
  pageSize: number
}) => Promise<void> | void

/** 新增表单配置 */
export interface ProCrudCreate extends Omit<ProFormProps, 'options'> {
  /** 按钮配置 */
  action?: ProFormAction
  /** 新增按钮文本 */
  buttonText?: string
  /** 新增对话框标题 */
  title?: string
}

/** 新增数据事件 */
export type ProCrudCreateEvent = (payload: {
  params: Record<string, any>
  done: ProFormDone
}) => Promise<void> | void

/** 数据查看选项 */
export interface ProCrudViewOption {
  /** 标题 */
  label: string
  /** 值 */
  value: string
}

/** 删除数据事件 */
export type ProCrudRemoveEvent = <T = any>(payload: {
  row: T
  done: () => void
}) => Promise<void> | void

/** 编辑表单配置 */
export interface ProCrudEdit extends Omit<ProFormProps, 'options'> {
  /** 编辑按钮文本 */
  buttonText?: string
  /** 编辑对话框标题 */
  title?: string
}

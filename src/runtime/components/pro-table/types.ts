import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type { PaginationProps, PaginationEmits } from 'element-plus'

import type { Slots } from '../../utils'

type ColumnProps<T> = Partial<Omit<TableColumnCtx<T>, 'id' | 'realWidth'>>

export interface ProTableColumn<T = any> extends ColumnProps<T> {
  slots?: Slots<'default' | 'header'>
}

type Pagination = Partial<PaginationProps> & {
  'onUpdate:currentPage'?: PaginationEmits['update:current-page']
  'onUpdate:pageSize'?: PaginationEmits['update:page-size']
  onSizeChange?: PaginationEmits['size-change']
  onCurrentChange?: PaginationEmits['current-change']
  onPrevClick?: PaginationEmits['prev-click']
  onNextClick?: PaginationEmits['next-click']
}

export type ProTablePagination = false | Pagination

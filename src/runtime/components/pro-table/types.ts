import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type { PaginationProps } from 'element-plus'
import { Writable } from 'element-plus/es/utils'

type ElTableColumnProps<T> = Partial<
  Pick<
    TableColumnCtx<T>,
    | 'type'
    | 'index'
    | 'label'
    | 'columnKey'
    | 'prop'
    | 'width'
    | 'minWidth'
    | 'fixed'
    | 'renderHeader'
    | 'sortable'
    | 'sortMethod'
    | 'sortBy'
    | 'sortOrders'
    | 'resizable'
    | 'formatter'
    | 'showOverflowTooltip'
    | 'align'
    | 'headerAlign'
    | 'className'
    | 'labelClassName'
    | 'selectable'
    | 'reserveSelection'
    | 'filters'
    | 'filterPlacement'
    | 'filterMultiple'
    | 'filterMethod'
    | 'filteredValue'
  >
>

export interface DataTableColumn<T = unknown> extends ElTableColumnProps<T> {
  /** 列插槽名称 */
  slot?: string
  /** 列标题插槽名称 */
  headerSlot?: string
}

export interface DataTablePagination extends Partial<Writable<PaginationProps>> {
  updateCurrentPage?: (value: number) => void
  updatePageSize?: (value: number) => void
}

export type Pagination = false | DataTablePagination

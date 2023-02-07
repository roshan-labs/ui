import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type { PaginationProps, PaginationEmits } from 'element-plus'

import type { Slots, SetPrefixEvent } from '../../utils'

// type ElTableColumnProps<T> = Partial<
//   Pick<
//     TableColumnCtx<T>,
//     | 'type'
//     | 'index'
//     | 'label'
//     | 'columnKey'
//     | 'prop'
//     | 'width'
//     | 'minWidth'
//     | 'fixed'
//     | 'renderHeader'
//     | 'sortable'
//     | 'sortMethod'
//     | 'sortBy'
//     | 'sortOrders'
//     | 'resizable'
//     | 'formatter'
//     | 'showOverflowTooltip'
//     | 'align'
//     | 'headerAlign'
//     | 'className'
//     | 'labelClassName'
//     | 'selectable'
//     | 'reserveSelection'
//     | 'filters'
//     | 'filterPlacement'
//     | 'filterMultiple'
//     | 'filterMethod'
//     | 'filteredValue'
//   >
// >

type ColumnProps<T> = Partial<Omit<TableColumnCtx<T>, 'id' | 'realWidth'>>

export interface DataTableColumn<T = any> extends ColumnProps<T> {
  slots?: Slots<'default' | 'header'>
}

type Pagination = Partial<PaginationProps> & SetPrefixEvent<PaginationEmits>
export type DataTablePagination = false | Pagination

import { Slots } from '../../type-utils'

export interface ProDescriptionsColumn {
  prop: string
  label?: string
  span?: number
  width?: string | number
  minWidth?: string | number
  align?: 'left' | 'center' | 'right'
  labelAlign?: 'left' | 'center' | 'right'
  className?: string
  labelClassName?: string
  slots?: Slots<'default' | 'label'>
}

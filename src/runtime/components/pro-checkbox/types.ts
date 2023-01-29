import type { CheckboxProps } from 'element-plus'

export interface CheckboxOption
  extends Pick<Partial<CheckboxProps>, 'trueLabel' | 'falseLabel' | 'disabled'> {
  value: string | number | Record<string, unknown>
  label: string
}

export type CheckboxType = 'default' | 'button' | 'border'

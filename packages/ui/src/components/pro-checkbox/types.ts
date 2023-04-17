import type { CheckboxProps } from 'element-plus'

export interface ProCheckboxOption
  extends Pick<Partial<CheckboxProps>, 'trueLabel' | 'falseLabel' | 'disabled'> {
  value: string | number | Record<string, unknown>
  label: string
}

export type ProCheckboxType = 'default' | 'button' | 'border'

import type { RadioProps } from 'element-plus'

export interface RadioOption extends Pick<Partial<RadioProps>, 'disabled'> {
  value: string | number | boolean
  label: string
}

export type RadioType = 'default' | 'button' | 'border'

import type { RadioProps } from 'element-plus'

export interface ProRadioOption extends Pick<Partial<RadioProps>, 'disabled'> {
  value: string | number | boolean
  label: string
}

export type ProRadioType = 'default' | 'button' | 'border'

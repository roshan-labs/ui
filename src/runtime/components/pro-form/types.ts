import type { Slot } from 'vue'
import type {
  RadioGroupProps,
  InputProps,
  InputNumberProps,
  CheckboxGroupProps,
  RateProps,
  ColorPickerProps,
  SliderProps,
  SwitchProps,
  TimePickerDefaultProps,
  TransferProps,
  UploadProps,
} from 'element-plus'

import type { RadioOption, RadioType } from '../pro-radio/types'
import type { CheckboxOption, CheckboxType } from '../pro-checkbox/types'

type SlotProp = string | Slot
type Slots<T extends string> = Partial<Record<T, SlotProp>>

interface FormBaseOption {
  prop: string
  label?: string
  value?: unknown
  slots?: Partial<Record<string, SlotProp>>
}

interface FormAutocomplete extends FormBaseOption {
  type: 'autocomplete'
  props?: Record<string, unknown>
  slots?: Slots<'default' | 'prefix' | 'suffix' | 'prepend' | 'append'>
}

interface FormInputOption extends FormBaseOption {
  type: 'input'
  props?: Omit<Partial<InputProps>, 'modelValue'>
}

interface FormInputNumberOption extends FormBaseOption {
  type: 'number'
  props?: Omit<Partial<InputNumberProps>, 'modelValue'>
}

interface RadioProps extends Omit<Partial<RadioGroupProps>, 'modelValue'> {
  options?: RadioOption[]
  type?: RadioType
  onChange?: (value: string | number | boolean) => void
}

interface FormRadioOption extends FormBaseOption {
  type: 'radio'
  props?: RadioProps
}

interface CheckboxProps extends Omit<Partial<CheckboxGroupProps>, 'modelValue'> {
  options?: CheckboxOption[]
  type?: CheckboxType
}

interface FormCheckboxOption extends FormBaseOption {
  type: 'checkbox'
  props?: CheckboxProps
}

interface FormRateOption extends FormBaseOption {
  type: 'rate'
  props?: Omit<Partial<RateProps>, 'modelValue'>
}

interface FormColorOption extends FormBaseOption {
  type: 'color'
  props?: Omit<Partial<ColorPickerProps>, 'modelValue'>
}

interface FormSliderOption extends FormBaseOption {
  type: 'slider'
  props?: Omit<Partial<SliderProps>, 'modelValue'>
}

interface FormSwitchOption extends FormBaseOption {
  type: 'switch'
  props?: Omit<Partial<SwitchProps>, 'modelValue'>
}

interface FormTimePickerOption extends FormBaseOption {
  type: 'time-picker'
  props?: Omit<Partial<TimePickerDefaultProps>, 'modelValue'>
}

interface FormTransferOption extends FormBaseOption {
  type: 'transfer'
  props?: Omit<Partial<TransferProps>, 'modelValue'>
  slots?: Slots<'left-footer' | 'right-footer'>
}

interface FormUploadOption extends FormBaseOption {
  type: 'upload'
  props?: Omit<Partial<UploadProps>, 'file-list'>
  slots?: Slots<'default' | 'trigger' | 'tip' | 'file'>
}

interface FormOtherOption extends FormBaseOption {
  type: 'cascader' | 'select' | 'date' | 'time-select'
  props?: Record<string, unknown>
}

export type FormOption =
  | FormAutocomplete
  | FormInputOption
  | FormInputNumberOption
  | FormRadioOption
  | FormCheckboxOption
  | FormRateOption
  | FormColorOption
  | FormSliderOption
  | FormSwitchOption
  | FormTimePickerOption
  | FormTransferOption
  | FormUploadOption
  | FormOtherOption

export interface FormAction {
  submit?: boolean
  submitText?: string
  reset?: boolean
  resetText?: string
}

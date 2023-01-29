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

interface FormBaseOption {
  prop: string
  label?: string
  value?: unknown
  slots?: Partial<Record<string, SlotProp>>
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

export interface FormRadioOption extends FormBaseOption {
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
  slots?: {
    'left-footer'?: SlotProp
    'right-footer'?: SlotProp
  }
}

interface FormUploadOption extends FormBaseOption {
  type: 'upload'
  props?: Omit<Partial<UploadProps>, 'file-list'>
  slots?: {
    default?: SlotProp
    trigger?: SlotProp
    tip?: SlotProp
    file?: SlotProp
  }
}

interface FormOtherOption extends FormBaseOption {
  type: 'autocomplete' | 'cascader' | 'select' | 'date' | 'time-select'
  props?: Record<string, unknown>
}

export type FormOption =
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

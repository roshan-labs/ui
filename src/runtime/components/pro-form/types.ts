import type { Slot } from 'vue'
import type {
  InputProps,
  InputEmits,
  InputNumberProps,
  InputNumberEmits,
  RadioGroupProps,
  RadioGroupEmits,
  CheckboxGroupProps,
  CheckboxGroupEmits,
  RateProps,
  RateEmits,
  ColorPickerProps,
  ColorPickerEmits,
  SliderProps,
  SliderEmits,
  SwitchProps,
  SwitchEmits,
  TimePickerDefaultProps,
  TransferProps,
  UploadProps,
} from 'element-plus'

import type { RadioOption, RadioType } from '../pro-radio/types'
import type { CheckboxOption, CheckboxType } from '../pro-checkbox/types'

type SlotProp = string | Slot
type Slots<T extends string> = Partial<Record<T, SlotProp>>
type SetPrefixEvent<T> = {
  [K in keyof Omit<T, 'update:modelValue'> as K extends string
    ? `on${Capitalize<K>}`
    : never]?: T[K]
}
type FormItemProps<T> = Omit<Partial<T>, 'modelValue'>

interface FormBaseOption {
  prop: string
  label?: string
  value?: unknown
  slots?: Partial<Record<string, SlotProp>>
}

/**
 * Autocomplete
 */

interface FormAutocomplete extends FormBaseOption {
  type: 'autocomplete'
  props?: Record<string, unknown>
  slots?: Slots<'default' | 'prefix' | 'suffix' | 'prepend' | 'append'>
}

/**
 * Input
 */

type FormInputProps = FormItemProps<InputProps> & SetPrefixEvent<InputEmits>

interface FormInputOption extends FormBaseOption {
  type: 'input'
  props?: FormInputProps
  slots?: Slots<'prefix' | 'suffix' | 'prepend' | 'append'>
}

/**
 * InputNumber
 */

interface FormInputNumberOption extends FormBaseOption {
  type: 'number'
  props?: FormItemProps<InputNumberProps> & SetPrefixEvent<InputNumberEmits>
}

/**
 * Radio
 */

type FormRadioProps = FormItemProps<RadioGroupProps> &
  SetPrefixEvent<RadioGroupEmits> & {
    type?: RadioType
    options?: RadioOption[]
  }

interface FormRadioOption extends FormBaseOption {
  type: 'radio'
  props?: FormRadioProps
}

/**
 * Checkbox
 */

type FormCheckboxProps = FormItemProps<CheckboxGroupProps> &
  SetPrefixEvent<CheckboxGroupEmits> & {
    type?: CheckboxType
    options?: CheckboxOption[]
  }

interface FormCheckboxOption extends FormBaseOption {
  type: 'checkbox'
  props?: FormCheckboxProps
}

/**
 * Rate
 */

interface FormRateOption extends FormBaseOption {
  type: 'rate'
  props?: FormItemProps<RateProps> & SetPrefixEvent<RateEmits>
}

/**
 * Color
 */

interface FormColorOption extends FormBaseOption {
  type: 'color'
  props?: FormItemProps<ColorPickerProps> & SetPrefixEvent<ColorPickerEmits>
}

/**
 * Slider
 */

interface FormSliderOption extends FormBaseOption {
  type: 'slider'
  props?: FormItemProps<SliderProps> & SetPrefixEvent<SliderEmits>
}

/**
 * Switch
 */

interface FormSwitchOption extends FormBaseOption {
  type: 'switch'
  props?: FormItemProps<SwitchProps> & SetPrefixEvent<SwitchEmits>
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

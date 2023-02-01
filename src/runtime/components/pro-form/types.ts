import type { Slot } from 'vue'
import type {
  CascaderProps,
  CascaderEmits,
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
  TransferEmits,
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
type FormItemProps<T, S extends string = 'modelValue'> = Omit<Partial<T>, S>

interface FormBaseOption {
  prop: string
  label?: string
  value?: unknown
  slots?: Partial<Record<string, SlotProp>>
}

/**
 * Autocomplete
 */

interface FormAutocompleteOption extends FormBaseOption {
  type: 'autocomplete'
  props?: Record<string, unknown>
  slots?: Slots<'default' | 'prefix' | 'suffix' | 'prepend' | 'append'>
}

/**
 * Cascader
 */

type FormCascaderProps = FormItemProps<CascaderProps> & SetPrefixEvent<CascaderEmits>

interface FormCascaderOption extends FormBaseOption {
  type: 'cascader'
  props?: FormCascaderProps
  slots?: Slots<'default' | 'empty'>
}

/**
 * CascaderPanel
 */

type FormCascaderPanelProps = Record<string, unknown> & {
  onChange?: CascaderEmits['change']
  expandChange?: CascaderEmits['expandChange']
}

interface FormCascaderPanelOption extends FormBaseOption {
  type: 'cascader-panel'
  props?: FormCascaderPanelProps
  slots?: Slots<'default'>
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

/**
 * TimePicker
 */

type FormTimePickerProps = FormItemProps<TimePickerDefaultProps> & {
  onChange?: (value: TimePickerDefaultProps['modelValue']) => void
  onBlur?: (e: FocusEvent) => void
  onFocus?: (e: FocusEvent) => void
  onVisibleChange?: (visibility: boolean) => void
}

interface FormTimePickerOption extends FormBaseOption {
  type: 'time-picker'
  props?: FormTimePickerProps
}

/**
 * TimeSelect
 */

type FormTimeSelectProps = Record<string, unknown> & {
  onChange?: (value: string) => void
  onBlur?: (e: FocusEvent) => void
  onFocus?: (e: FocusEvent) => void
}

interface FormTimeSelectOption extends FormBaseOption {
  type: 'time-select'
  props?: FormTimeSelectProps
}

/**
 * Transfer
 */

type FormTransferProps = FormItemProps<TransferProps> & {
  onChange?: TransferEmits['change']
  onLeftCheckChange?: TransferEmits['left-check-change']
  onRightCheckChange?: TransferEmits['right-check-change']
}

interface FormTransferOption extends FormBaseOption {
  type: 'transfer'
  props?: FormTransferProps
  slots?: Slots<'default' | 'left-footer' | 'right-footer'>
}

/**
 * Upload
 */

interface FormUploadOption extends FormBaseOption {
  type: 'upload'
  props?: FormItemProps<UploadProps, 'fileList'>
  slots?: Slots<'default' | 'trigger' | 'tip' | 'file'>
}

/**
 * Select
 */

type FormSelectProps = Record<string, unknown> & {
  onChange?: (value: unknown) => void
  onVisibleChange?: (value: boolean) => void
  onRemoveTag?: (value: unknown) => void
  onClear?: () => void
  onBlur?: (e: FocusEvent) => void
  onFocus?: (e: FocusEvent) => void
}

interface FormSelectOption extends FormBaseOption {
  type: 'select'
  props?: FormSelectProps
  slots?: Slots<'default' | 'empty' | 'prefix'>
}

/**
 * Gobal
 */

interface FormOtherOption extends FormBaseOption {
  type: 'date' | 'time-select'
  props?: Record<string, unknown>
}

export type FormOption =
  | FormAutocompleteOption
  | FormCascaderOption
  | FormCascaderPanelOption
  | FormInputOption
  | FormInputNumberOption
  | FormRadioOption
  | FormCheckboxOption
  | FormRateOption
  | FormColorOption
  | FormSliderOption
  | FormSwitchOption
  | FormTimePickerOption
  | FormTimeSelectOption
  | FormTransferOption
  | FormUploadOption
  | FormSelectOption
  | FormOtherOption

export interface FormAction {
  submit?: boolean
  submitText?: string
  reset?: boolean
  resetText?: string
}

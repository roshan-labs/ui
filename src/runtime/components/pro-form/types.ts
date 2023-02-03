import type { Slot } from 'vue'
import type {
  FormItemProps,
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
type PickProps<T, S extends string = 'modelValue'> = Omit<Partial<T>, S>

interface FormBaseOption extends Partial<FormItemProps> {
  prop: string
  value?: unknown
  slots?: Slots<'default' | 'label' | 'error'>
}

/**
 * Autocomplete
 */

type FormAutocompleteProps = Record<string, unknown> & {
  slots?: Slots<'default' | 'prefix' | 'suffix' | 'prepend' | 'append'>
}

interface FormAutocompleteOption extends FormBaseOption {
  type: 'autocomplete'
  component: FormAutocompleteProps
}

/**
 * Cascader
 */

type FormCascaderProps = PickProps<CascaderProps> &
  SetPrefixEvent<CascaderEmits> & {
    slots?: Slots<'default' | 'empty'>
  }

interface FormCascaderOption extends FormBaseOption {
  type: 'cascader'
  component: FormCascaderProps
}

/**
 * CascaderPanel
 */

type FormCascaderPanelProps = Record<string, unknown> & {
  onChange?: CascaderEmits['change']
  expandChange?: CascaderEmits['expandChange']
  slots?: Slots<'default'>
}

interface FormCascaderPanelOption extends FormBaseOption {
  type: 'cascader-panel'
  component: FormCascaderPanelProps
}

/**
 * Input
 */

type FormInputProps = Record<string, unknown> &
  PickProps<InputProps> &
  SetPrefixEvent<InputEmits> & {
    slots?: Slots<'prefix' | 'suffix' | 'prepend' | 'append'>
  }

interface FormInputOption extends FormBaseOption {
  type: 'input'
  component?: FormInputProps
}

/**
 * InputNumber
 */

interface FormInputNumberOption extends FormBaseOption {
  type: 'number'
  component: PickProps<InputNumberProps> & SetPrefixEvent<InputNumberEmits>
}

/**
 * Radio
 */

type FormRadioProps = PickProps<RadioGroupProps> &
  SetPrefixEvent<RadioGroupEmits> & {
    type?: RadioType
    options?: RadioOption[]
  }

interface FormRadioOption extends FormBaseOption {
  type: 'radio'
  component: FormRadioProps
}

/**
 * Checkbox
 */

type FormCheckboxProps = PickProps<CheckboxGroupProps> &
  SetPrefixEvent<CheckboxGroupEmits> & {
    type?: CheckboxType
    options?: CheckboxOption[]
  }

interface FormCheckboxOption extends FormBaseOption {
  type: 'checkbox'
  component: FormCheckboxProps
}

/**
 * Rate
 */

interface FormRateOption extends FormBaseOption {
  type: 'rate'
  component: PickProps<RateProps> & SetPrefixEvent<RateEmits>
}

/**
 * Color
 */

interface FormColorOption extends FormBaseOption {
  type: 'color'
  component: PickProps<ColorPickerProps> & SetPrefixEvent<ColorPickerEmits>
}

/**
 * DatePicker
 */

type FormDatePickerProps = Record<string, unknown> & {
  slots?: Slots<'default' | 'range-separator'>
}

interface FormDatePickerOption extends FormBaseOption {
  type: 'date-picker'
  component: FormDatePickerProps
}

/**
 * Slider
 */

interface FormSliderOption extends FormBaseOption {
  type: 'slider'
  component: PickProps<SliderProps> & SetPrefixEvent<SliderEmits>
}

/**
 * Switch
 */

interface FormSwitchOption extends FormBaseOption {
  type: 'switch'
  component: PickProps<SwitchProps> & SetPrefixEvent<SwitchEmits>
}

/**
 * TimePicker
 */

type FormTimePickerProps = PickProps<TimePickerDefaultProps> & {
  onChange?: (value: TimePickerDefaultProps['modelValue']) => void
  onBlur?: (e: FocusEvent) => void
  onFocus?: (e: FocusEvent) => void
  onVisibleChange?: (visibility: boolean) => void
}

interface FormTimePickerOption extends FormBaseOption {
  type: 'time-picker'
  component: FormTimePickerProps
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
  component: FormTimeSelectProps
}

/**
 * Transfer
 */

type FormTransferProps = PickProps<TransferProps> & {
  onChange?: TransferEmits['change']
  onLeftCheckChange?: TransferEmits['left-check-change']
  onRightCheckChange?: TransferEmits['right-check-change']
  slots?: Slots<'default' | 'left-footer' | 'right-footer'>
}

interface FormTransferOption extends FormBaseOption {
  type: 'transfer'
  component: FormTransferProps
}

/**
 * Upload
 */

type FormUploadProps = PickProps<UploadProps, 'fileList'> & {
  slots?: Slots<'default' | 'trigger' | 'tip' | 'file'>
}

interface FormUploadOption extends FormBaseOption {
  type: 'upload'
  component: FormUploadProps
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
  slots?: Slots<'default' | 'empty' | 'prefix'>
}

interface FormSelectOption extends FormBaseOption {
  type: 'select'
  component: FormSelectProps
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
  | FormDatePickerOption
  | FormSliderOption
  | FormSwitchOption
  | FormTimePickerOption
  | FormTimeSelectOption
  | FormTransferOption
  | FormUploadOption
  | FormSelectOption

export interface FormAction {
  submit?: boolean
  submitText?: string
  reset?: boolean
  resetText?: string
}

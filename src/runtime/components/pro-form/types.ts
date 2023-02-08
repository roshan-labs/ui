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
  ColProps,
} from 'element-plus'

import type { RadioOption, RadioType } from '../pro-radio/types'
import type { ProCheckboxOption, ProCheckboxType } from '../pro-checkbox/types'
import type { Slots } from '../../utils'

type SetPrefixEvent<T> = {
  [K in keyof Omit<T, 'update:modelValue'> as K extends string
    ? `on${Capitalize<K>}`
    : never]?: T[K]
}
type MakeProps<T> = T & Record<string, unknown>
type PickProps<T, S extends string = 'modelValue'> = Omit<Partial<T>, S>
type LayoutColProps = Partial<Omit<ColProps, 'tag'>>

type FormBaseOption = Partial<FormItemProps> &
  LayoutColProps & {
    prop: string
    value?: unknown
    slots?: Slots<'default' | 'label' | 'error'>
    span?: number
  }

/**
 * Autocomplete
 */

type FormAutocompleteProps = MakeProps<{
  slots?: Slots<'default' | 'prefix' | 'suffix' | 'prepend' | 'append'>
}>

interface FormAutocompleteOption extends FormBaseOption {
  type: 'autocomplete'
  component?: FormAutocompleteProps
}

/**
 * Cascader
 */

type FormCascaderProps = MakeProps<
  PickProps<CascaderProps> &
    SetPrefixEvent<CascaderEmits> & {
      slots?: Slots<'default' | 'empty'>
    }
>

interface FormCascaderOption extends FormBaseOption {
  type: 'cascader'
  component?: FormCascaderProps
}

/**
 * CascaderPanel
 */

type FormCascaderPanelProps = MakeProps<
  Record<string, unknown> & {
    onChange?: CascaderEmits['change']
    expandChange?: CascaderEmits['expandChange']
    slots?: Slots<'default'>
  }
>

interface FormCascaderPanelOption extends FormBaseOption {
  type: 'cascader-panel'
  component?: FormCascaderPanelProps
}

/**
 * Checkbox
 */

type FormCheckboxProps = MakeProps<
  PickProps<CheckboxGroupProps> &
    SetPrefixEvent<CheckboxGroupEmits> & {
      type?: ProCheckboxType
      options?: ProCheckboxOption[]
    }
>

interface FormCheckboxOption extends FormBaseOption {
  type: 'checkbox'
  component?: FormCheckboxProps
}

/**
 * ColorPicker
 */

interface FormColorPickerOption extends FormBaseOption {
  type: 'color-picker'
  component?: MakeProps<PickProps<ColorPickerProps> & SetPrefixEvent<ColorPickerEmits>>
}

/**
 * DatePicker
 */

type FormDatePickerProps = MakeProps<{
  slots?: Slots<'default' | 'range-separator'>
}>

interface FormDatePickerOption extends FormBaseOption {
  type: 'date-picker'
  component?: FormDatePickerProps
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
  type: 'input-number'
  component?: MakeProps<PickProps<InputNumberProps> & SetPrefixEvent<InputNumberEmits>>
}

/**
 * Radio
 */

type FormRadioProps = MakeProps<
  PickProps<RadioGroupProps> &
    SetPrefixEvent<RadioGroupEmits> & {
      type?: RadioType
      options?: RadioOption[]
    }
>

interface FormRadioOption extends FormBaseOption {
  type: 'radio'
  component?: FormRadioProps
}

/**
 * Rate
 */

interface FormRateOption extends FormBaseOption {
  type: 'rate'
  component?: MakeProps<PickProps<RateProps> & SetPrefixEvent<RateEmits>>
}

/**
 * Slider
 */

interface FormSliderOption extends FormBaseOption {
  type: 'slider'
  component?: MakeProps<PickProps<SliderProps> & SetPrefixEvent<SliderEmits>>
}

/**
 * Switch
 */

interface FormSwitchOption extends FormBaseOption {
  type: 'switch'
  component?: MakeProps<PickProps<SwitchProps> & SetPrefixEvent<SwitchEmits>>
}

/**
 * TimePicker
 */

type FormTimePickerProps = MakeProps<
  PickProps<TimePickerDefaultProps> & {
    onChange?: (value: TimePickerDefaultProps['modelValue']) => void
    onBlur?: (e: FocusEvent) => void
    onFocus?: (e: FocusEvent) => void
    onVisibleChange?: (visibility: boolean) => void
  }
>

interface FormTimePickerOption extends FormBaseOption {
  type: 'time-picker'
  component?: FormTimePickerProps
}

/**
 * TimeSelect
 */

type FormTimeSelectProps = MakeProps<{
  onChange?: (value: string) => void
  onBlur?: (e: FocusEvent) => void
  onFocus?: (e: FocusEvent) => void
}>

interface FormTimeSelectOption extends FormBaseOption {
  type: 'time-select'
  component?: FormTimeSelectProps
}

/**
 * Transfer
 */

type FormTransferProps = MakeProps<
  PickProps<TransferProps> & {
    onChange?: TransferEmits['change']
    onLeftCheckChange?: TransferEmits['left-check-change']
    onRightCheckChange?: TransferEmits['right-check-change']
    slots?: Slots<'default' | 'left-footer' | 'right-footer'>
  }
>

interface FormTransferOption extends FormBaseOption {
  type: 'transfer'
  component?: FormTransferProps
}

/**
 * Upload
 */

type FormUploadProps = MakeProps<
  PickProps<UploadProps, 'fileList'> & {
    slots?: Slots<'default' | 'trigger' | 'tip' | 'file'>
  }
>

interface FormUploadOption extends FormBaseOption {
  type: 'upload'
  component?: FormUploadProps
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
  component?: FormSelectProps
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
  | FormColorPickerOption
  | FormDatePickerOption
  | FormSliderOption
  | FormSwitchOption
  | FormTimePickerOption
  | FormTimeSelectOption
  | FormTransferOption
  | FormUploadOption
  | FormSelectOption

export interface FormAction extends LayoutColProps {
  submit?: boolean
  submitText?: string
  reset?: boolean
  resetText?: string
}

export type FormSubmit<T = any> = (done: () => void, isValid: boolean, fields: T) => void

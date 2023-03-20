import type { Ref } from 'vue'
import type {
  FormProps,
  FormEmits,
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

import type { ProRadioOption, ProRadioType } from '../pro-radio/types'
import type { ProCheckboxOption, ProCheckboxType } from '../pro-checkbox/types'
import type { Slots, Writable } from '../../utils'

type SetPrefixEvent<T> = {
  [K in keyof Omit<T, 'update:modelValue'> as K extends string
    ? `on${Capitalize<K>}`
    : never]?: T[K]
}
type MakeProps<T> = T & Record<string, any>
type PickProps<T, S extends string = 'modelValue'> = Omit<Partial<T>, S>
type LayoutColProps = Partial<Omit<Writable<ColProps>, 'tag'>>

type FormBaseOption = Partial<FormItemProps> &
  LayoutColProps & {
    prop: string
    value?: any
    slots?: Slots<'default' | 'label' | 'error'>
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

type FormCascaderPanelProps = MakeProps<{
  onChange?: CascaderEmits['change']
  expandChange?: CascaderEmits['expandChange']
  slots?: Slots<'default'>
}>

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

type FormInputProps = MakeProps<
  PickProps<InputProps> &
    SetPrefixEvent<InputEmits> & {
      slots?: Slots<'prefix' | 'suffix' | 'prepend' | 'append'>
    }
>

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
      type?: ProRadioType
      options?: ProRadioOption[]
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

type FormSelectProps = MakeProps<{
  onChange?: (value: any) => void
  onVisibleChange?: (value: boolean) => void
  onRemoveTag?: (value: any) => void
  onClear?: () => void
  onBlur?: (e: FocusEvent) => void
  onFocus?: (e: FocusEvent) => void
  slots?: Slots<'default' | 'empty' | 'prefix'>
}>

interface FormSelectOption extends FormBaseOption {
  type: 'select'
  component?: FormSelectProps
}

/**
 * SelectV2
 */
interface FormSelectV2Option extends FormBaseOption {
  type: 'select-v2'
  component?: FormSelectProps
}

export type ProFormOption =
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
  | FormSelectV2Option

export interface ProFormAction extends LayoutColProps {
  submit?: boolean
  submitText?: string
  reset?: boolean
  resetText?: string
}

export type ProFormDone = () => void

/** 表单提交前的方法 */
export type ProFormBeforeSubmit<F = any> = (
  /** 表单提交字段 */
  fields: F,
  /** 验证是否通过 */
  isValid: boolean,
  /** 触发 submit 事件 */
  done: ProFormDone,
  /** 表单提交加载状态 */
  loading: Ref<boolean>
) => Promise<void> | void

/** 表单提交 */
export type ProFormSubmit<F = any> = (fields: F, isValid: boolean) => void

export type ProFormModelValue = Record<string, any>

/** ProForm 组件属性 */
export type ProFormProps = Partial<Omit<Writable<FormProps>, 'model'>> &
  SetPrefixEvent<FormEmits> & {
    modelValue?: ProFormModelValue
    options?: ProFormOption[]
    action?: false | ProFormAction
    beforeSubmit?: ProFormBeforeSubmit
    'onUpdate:modelValue'?: (value: ProFormModelValue) => void
    onReset?: () => void
    onSubmit?: ProFormSubmit
  }

interface SelectOption {
  /** 选项标签 */
  label: string | number
  /** 选项值 */
  value: string | number | boolean | Record<string, any>
  /** 是否禁用选项 */
  disabled?: boolean
}

export interface SelectGroup {
  /** 分组标签 */
  label: string
  /** 选项集合 */
  group: SelectOption[]
  /** 是否禁用分组下所有选项 */
  disabled?: boolean
}

/** ProSelect 选项 */
export type ProSelectOption = SelectOption | SelectGroup

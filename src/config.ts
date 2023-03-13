import components from 'element-plus/es/component'

/** element-plus 组件列表 */
export const baseComponents = components.map((item: any) => item.name as string)

export const proComponents = [
  { dirname: 'pro-checkbox', name: 'ProCheckbox' },
  { dirname: 'pro-crud', name: 'ProCrud' },
  { dirname: 'pro-dialog', name: 'ProDialog' },
  { dirname: 'pro-form', name: 'ProForm' },
  { dirname: 'pro-radio', name: 'ProRadio' },
]

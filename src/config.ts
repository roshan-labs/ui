import components from 'element-plus/es/component'

/** element-plus 组件列表 */
export const baseComponents = components.map((item: any) => item.name as string)

/** element-plus 子组件列表 */
export const subComponents = {
  ElBreadcrumb: ['ElBreadcrumbItem'],
  ElButton: ['ElButtonGroup'],
  ElCarousel: ['ElCarouselItem'],
  ElCheckbox: ['ElCheckboxButton', 'ElCheckboxGroup'],
  ElCollapse: ['ElCollapseItem'],
  ElContainer: ['ElAside', 'ElFooter', 'ElHeader', 'ElMain'],
  ElDescriptions: ['ElDescriptionsItem'],
  ElDropdown: ['ElDropdownItem', 'ElDropdownMenu'],
  ElForm: ['ElFormItem'],
  ElMenu: ['ElMenuItem', 'ElMenuItemGroup', 'ElSubMenu'],
  ElRadio: ['ElRadioGroup', 'ElRadioButton'],
  ElSkeleton: ['ElSkeletonItem'],
  ElSelect: ['ElOption', 'ElOptionGroup'],
  ElSteps: ['ElStep'],
  ElTable: ['ElTableColumn'],
  ElTableV2: ['ElAutoResizer'],
  ElTabs: ['ElTabPane'],
  ElTimeline: ['ElTimelineItem'],
}

export const proComponents = [
  { dirname: 'pro-checkbox', name: 'ProCheckbox' },
  { dirname: 'pro-crud', name: 'ProCrud' },
  { dirname: 'pro-dialog', name: 'ProDialog' },
  { dirname: 'pro-form', name: 'ProForm' },
  { dirname: 'pro-radio', name: 'ProRadio' },
]

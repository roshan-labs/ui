import type { ElIdInjectionContext } from 'element-plus'
import components from 'element-plus/es/component'

export const libraryName = 'element-plus'

export const injectionKey: ElIdInjectionContext = {
  prefix: 1024,
  current: 0,
}

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

/** 高级组件列表 */
export const proComponents = [
  { dirname: 'history-tabs', name: 'HistoryTabs' },
  { dirname: 'pro-checkbox', name: 'ProCheckbox' },
  { dirname: 'pro-crud', name: 'ProCrud' },
  { dirname: 'pro-descriptions', name: 'ProDescriptions' },
  { dirname: 'pro-dialog', name: 'ProDialog' },
  { dirname: 'pro-form', name: 'ProForm' },
  { dirname: 'pro-radio', name: 'ProRadio' },
  { dirname: 'pro-select', name: 'ProSelect' },
  { dirname: 'route-breadcrumb', name: 'RouteBreadcrumb' },
  { dirname: 'watermark', name: 'Watermark' },
]

/** element-plus 指令 */
export const directives: Record<string, string[]> = {
  Loading: ['ElLoadingDirective', 'ElLoading'],
  Popover: ['ElPopoverDirective', 'ElPopover'],
  InfiniteScroll: ['ElInfiniteScroll'],
}

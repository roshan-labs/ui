import type { Ref, ComputedRef } from 'vue'
import { computed, useSlots } from 'vue'

import { ProCrudActions } from '../types'

/**
 * 工具栏
 */
export const useToolbar = (
  title: Ref<string>,
  createVisible: ComputedRef<boolean>,
  actions: Ref<ProCrudActions>
) => {
  const slots = useSlots()

  /** 工具栏是否可见 */
  const toolbarVisible = computed(() => {
    const { refresh, setting, size } = actions.value

    return (
      title.value.trim() !== '' ||
      createVisible.value ||
      !!refresh ||
      !!setting ||
      !!size ||
      !!slots.toolbar
    )
  })

  /** 工具栏控件是否可见 */
  const actionsVisible = computed(() => {
    const { refresh, setting, size } = actions.value

    return !!refresh || !!setting || !!size
  })

  return {
    toolbarVisible,
    actionsVisible,
  }
}

import type { Ref, ComputedRef } from 'vue'
import { computed } from 'vue'

import { ProCrudActions } from '../types'

/**
 * 工具栏
 */
export const useToolbar = (
  title: Ref<string>,
  createVisible: ComputedRef<boolean>,
  actions: Ref<ProCrudActions>
) => {
  const toolbarVisible = computed(() => {
    const { refresh } = actions.value

    return title.value.trim() !== '' || createVisible.value || !!refresh
  })

  return {
    toolbarVisible,
  }
}

import type { Ref, ComputedRef } from 'vue'
import { computed } from 'vue'

/**
 * 工具栏
 */
export const useToolbar = (title: Ref<string>, createVisible: ComputedRef<boolean>) => {
  const toolbarVisible = computed(() => title.value.trim() || createVisible.value)

  return {
    toolbarVisible,
  }
}

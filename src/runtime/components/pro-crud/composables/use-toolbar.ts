import type { Ref } from 'vue'
import { computed } from 'vue'

export const useToolbar = (title: Ref<string>) => {
  const toolbarVisible = computed(() => title.value)

  return {
    toolbarVisible,
  }
}

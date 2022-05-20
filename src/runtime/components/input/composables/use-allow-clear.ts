import { Ref, computed } from 'vue'

export function useAllowClear(modelValue: Ref<string>, allowClear: Ref<boolean>) {
  const clearVisible = computed(() => allowClear.value && modelValue.value !== '')

  return {
    clearVisible,
  }
}

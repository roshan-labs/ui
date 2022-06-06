import { Ref, computed } from 'vue'

export function useAllowClear(value: Ref<string>, allowClear: Ref<boolean>) {
  const clearVisible = computed(() => allowClear.value && value.value !== '')

  const onClear = () => {
    value.value = ''
  }

  return {
    clearVisible,
    onClear,
  }
}

import { Ref, computed } from 'vue'

import { EmitFn } from '../../utils/types'

export function useAllowClear(
  value: Ref<string>,
  allowClear: Ref<boolean>,
  emit: EmitFn<'update:modelValue'>
) {
  const clearVisible = computed(() => allowClear.value && value.value !== '')

  const onClear = () => {
    value.value = ''
    emit('update:modelValue', '')
  }

  return {
    clearVisible,
    onClear,
  }
}

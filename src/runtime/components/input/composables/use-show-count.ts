import { Ref, computed } from 'vue'

export function useShowCount(
  value: Ref<string>,
  showCount: Ref<boolean>,
  maxlength: Ref<number | undefined>
) {
  const countText = computed(() => {
    if (showCount.value) {
      return typeof maxlength.value === 'number'
        ? `${value.value.length} / ${maxlength.value}`
        : `${value.value.length}`
    }

    return ''
  })

  return { countText }
}

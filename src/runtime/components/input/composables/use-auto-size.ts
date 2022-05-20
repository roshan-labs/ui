import { Ref, StyleValue, ref, shallowRef, watch, nextTick, onMounted } from 'vue'

import { AutoSize, calcTextareaHeight } from '../utils'

export function useAutoSize(value: Ref<string>, autoSize: Ref<AutoSize>) {
  const textarea = ref<HTMLTextAreaElement | null>(null)
  const textareaStyle = shallowRef<StyleValue>('')

  const resizeTextarea = () => {
    if (!textarea.value) return
    if (autoSize.value) {
      textareaStyle.value = calcTextareaHeight(textarea.value)
    }
  }

  watch(value, () => {
    nextTick(resizeTextarea)
  })

  onMounted(() => {
    resizeTextarea()
  })

  return {
    textarea,
    textareaStyle,
  }
}

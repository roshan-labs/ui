import { Ref, StyleValue, ref, shallowRef, watch, nextTick, onMounted } from 'vue'

import { Autosize, calcTextareaHeight } from '../utils'
import { isPlainObject } from '../../utils/utils'

export function useAutoSize(value: Ref<string>, autosize: Ref<Autosize>) {
  const textarea = ref<HTMLTextAreaElement | null>(null)
  const textareaStyle = shallowRef<StyleValue>([])

  const resizeTextarea = () => {
    if (!textarea.value) return
    if (autosize.value) {
      const minRows = isPlainObject(autosize.value) ? autosize.value.minRows : undefined
      const maxRows = isPlainObject(autosize.value) ? autosize.value.maxRows : undefined

      textareaStyle.value = calcTextareaHeight(textarea.value, minRows, maxRows)
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

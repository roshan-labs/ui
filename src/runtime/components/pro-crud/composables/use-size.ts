import type { ComponentSize } from 'element-plus'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'

/**
 * Crud 密度
 */
export const useSize = (sizeProp: Ref<ComponentSize>) => {
  /** 密度尺寸 */
  const size = ref<ComponentSize>('')

  /** 密度选项 */
  const sizeOptions = [
    { value: 'small', label: '紧凑' },
    { value: 'default', label: '默认' },
    { value: 'large', label: '宽松' },
  ]

  watch(
    sizeProp,
    (value) => {
      size.value = value
    },
    { immediate: true }
  )

  const changeSize = (value: ComponentSize) => {
    size.value = value
  }

  return {
    size,
    sizeOptions,
    changeSize,
  }
}

import type { ComponentSize } from 'element-plus'
import type { Ref } from 'vue'
import { computed } from 'vue'

/**
 * Crud 密度
 */
export const useSize = (
  sizeProp: Ref<ComponentSize>,
  emit: (event: 'update:size', ...args: any[]) => void
) => {
  /** 密度尺寸 */
  const sizeModel = computed({
    get: () => sizeProp.value,
    set: (value) => emit('update:size', value),
  })

  /** 密度选项 */
  const sizeOptions = [
    { value: 'small', label: '紧凑' },
    { value: 'default', label: '默认' },
    { value: 'large', label: '宽松' },
  ]

  const changeSize = (value: ComponentSize) => {
    sizeModel.value = value
  }

  return {
    sizeModel,
    sizeOptions,
    changeSize,
  }
}

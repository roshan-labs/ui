import type { ComputedRef } from 'vue'
import { ref } from 'vue'

import type { ProCrudColumn } from '../types'

/**
 * 数据查看
 */
export const useView = (columns: ComputedRef<ProCrudColumn[]>) => {
  /** 是否显示查看数据对话框 */
  const viewVisible = ref(false)

  const viewData = (index: number) => {

  }

  return {
    viewVisible,
  }
}

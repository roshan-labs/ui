import type { Ref } from 'vue'
import { ref } from 'vue'

import type { Data } from '../types'
import { useElMessageBox } from '../../../composables'

/**
 * 删除数据操作
 */
export const useRemove = () => {
  /** 选择删除的数据 */
  // const selectedRow = ref<Data | null>(null)

  const selectRemoveRow = () => {
    useElMessageBox().confirm('确定删除这条数据吗？')
  }

  return {
    selectRemoveRow,
  }
}

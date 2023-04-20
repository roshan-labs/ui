import type { Ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type { ProCrudData } from '../types'

/**
 * 删除数据操作
 */
export const useRemove = (
  data: Ref<ProCrudData>,
  emit: (event: 'remove', ...args: any[]) => void,
  refreshRequest: () => void
) => {
  /** 确认删除数据 */
  const removeRow = (index: number) => {
    const row = data.value[index]

    if (row) {
      ElMessageBox.confirm('确定删除这条数据吗？', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose(action, instance, done) {
          if (action === 'confirm') {
            const createDone = () => () => {
              done()
              instance.confirmButtonLoading = false
              refreshRequest()
            }

            instance.confirmButtonLoading = true
            emit('remove', { row, done: createDone() })
          } else {
            done()
          }
        },
      })
        .then(() => {
          ElMessage.success('删除成功！')
        })
        .catch(() => {})
    }
  }

  return {
    removeRow,
  }
}

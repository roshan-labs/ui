import type { Ref } from 'vue'
import { ref, computed } from 'vue'

import type { ProCrudData, ProCrudColumn } from '../types'
import type { ProFormProps, ProFormOption } from '../../pro-form/types'

/**
 * 数据查看
 */
export const useView = (data: Ref<ProCrudData>, columns: Ref<ProCrudColumn[]>) => {
  /** 是否显示查看数据对话框 */
  const viewVisible = ref(false)

  /** 选中的一条数据 */
  const selectedRow: Ref<any> = ref(null)

  const viewFormOptions = computed<ProFormOption[]>(() =>
    columns.value.reduce<ProFormOption[]>((prev, column) => {
      prev.push({
        type: 'input',
        prop: column.prop ?? '',
        label: column.label ?? '',
      })

      return prev
    }, [])
  )

  /** 查看对话框表单配置 */
  const viewFormProps = computed<ProFormProps>(() => ({
    options: viewFormOptions.value,
  }))

  /** 打开查看对话框 */
  const viewRow = (index: number) => {
    const row = data.value[index]

    if (row) {
      selectedRow.value = row
      viewVisible.value = true
    }
  }

  return {
    viewVisible,
    viewFormProps,
    viewRow,
  }
}

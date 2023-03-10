import type { Ref } from 'vue'
import { ref, computed } from 'vue'

import type { ProCrudEdit, ProCrudData, Data, ProCrudColumn } from '../types'
import type { ProFormProps, ProFormOption } from '../../pro-form/types'
import { isBoolean } from '../../../utils'

/**
 * 编辑数据
 */
export const useEdit = (
  edit: Ref<ProCrudEdit>,
  data: Ref<ProCrudData>,
  columns: Ref<ProCrudColumn[]>
) => {
  /** 编辑 */
  const editDialogVisible = ref(false)

  /** 当前编辑的数据 */
  const selectedRow = ref<Data | null>(null)

  /** 编辑对话框标题 */
  const editDialogTitle = computed(() => edit.value.title ?? '编辑')

  /** 编辑入口是否显示 */
  const editVisible = computed(() => columns.value.some((column) => column.edit ?? false))

  const formOptions = computed(() =>
    columns.value.reduce<ProFormOption[]>((prev, column) => {
      const { edit: editProp } = column
      const prop = column.prop ?? ''
      const value = selectedRow.value ? selectedRow.value[prop] ?? '' : ''

      if (isBoolean(editProp) && editProp) {
        prev.push({
          type: 'input',
          label: column.label ?? '',
          prop,
          value,
        })
      }

      return prev
    }, [])
  )

  /** 编辑表单 */
  const editFormProps = computed<ProFormProps>(() => ({
    ...edit.value,
    options: formOptions.value,
    action: false,
  }))

  const editRow = (index: number) => {
    const row = data.value[index]

    if (row) {
      selectedRow.value = row
      editDialogVisible.value = true
    }
  }

  return {
    editDialogVisible,
    editDialogTitle,
    editVisible,
    editFormProps,
    editRow,
  }
}

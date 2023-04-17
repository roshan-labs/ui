import type { Ref } from 'vue'
import { ref, computed } from 'vue'

import type { ProCrudEdit, ProCrudData, Data, ProCrudColumn, ProCrudEditEvent } from '../types'
import type { ProFormProps, ProFormOption } from '../../pro-form/types'
import { isBoolean } from '../../../utils'

/**
 * 编辑数据
 */
export const useEdit = (
  edit: Ref<ProCrudEdit>,
  data: Ref<ProCrudData>,
  columns: Ref<ProCrudColumn[]>,
  emit: (event: 'edit', ...args: any[]) => void
) => {
  /** 编辑 */
  const editDialogVisible = ref(false)

  /** 当前编辑的数据 */
  const selectedRow = ref<Data | null>(null)

  const editFields = ref({})
  const updateEditFields: ProFormProps['onUpdate:modelValue'] = (value) => {
    editFields.value = value
  }

  /** 编辑对话框标题 */
  const editDialogTitle = computed(() => edit.value.title ?? '编辑')

  /** 编辑入口是否显示 */
  const editVisible = computed(() => columns.value.some((column) => !!column.edit))

  const formOptions = computed(() =>
    columns.value.reduce<ProFormOption[]>((prev, column) => {
      const { edit: editProp } = column

      if (isBoolean(editProp) && editProp) {
        const prop = column.prop ?? ''
        const value = selectedRow.value ? selectedRow.value[prop] ?? '' : ''

        prev.push({
          type: 'input',
          label: column.label ?? '',
          prop,
          value,
        })
      } else if (editProp) {
        const prop = editProp.prop || column.prop || ''
        const value = selectedRow.value ? selectedRow.value[prop] ?? '' : ''

        prev.push({
          ...editProp,
          label: editProp.label || column.label || '',
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
    modelValue: editFields.value,
    options: formOptions.value,
    action: false,
    'onUpdate:modelValue': updateEditFields,
  }))

  /** 打开编辑数据对话框 */
  const editRow = (index: number) => {
    const row = data.value[index]

    if (row) {
      selectedRow.value = row
      editDialogVisible.value = true
    }
  }

  const editRequest: ProCrudEditEvent = (payload) => {
    emit('edit', payload)
  }

  return {
    selectedRow,
    editDialogVisible,
    editDialogTitle,
    editVisible,
    editFormProps,
    editRow,
    editRequest,
  }
}

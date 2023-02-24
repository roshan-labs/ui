import type { Ref } from 'vue'
import { ref, computed } from 'vue'

import type { ProCrudColumn, ProCrudCreate, ProCrudCreateRequest } from '../types'
import type { ProFormProps, ProFormOption, ProFormSubmit } from '../../pro-form/types'
import { isUndefined, isBoolean } from '../../../utils'

/**
 * 新增数据
 */
export const useCreate = (
  create: Ref<ProCrudCreate>,
  columns: Ref<ProCrudColumn[]>,
  createRequest?: ProCrudCreateRequest
) => {
  /** 新增数据对话框是否显示 */
  const createDialogVisible = ref(false)

  /** 新增数据功能是否显示 */
  const createVisible = computed(() => columns.value.some((column) => !isUndefined(column.create)))

  /** 新增按钮文本 */
  const createText = computed(() => create.value.createText ?? '新增')

  /** ProForm options */
  const options = computed(() =>
    columns.value.reduce<ProFormOption[]>((prev, column) => {
      const { create: createProps } = column

      if (isBoolean(createProps) && createProps) {
        prev.push({
          type: 'input',
          prop: column.prop,
          label: column.label ?? '',
        })
      } else if (createProps) {
        const option: ProFormOption = {
          ...createProps,
          prop: column.prop,
          label: column.label,
        }

        prev.push(option)
      }

      return prev
    }, [])
  )

  /** 新增表单属性 */
  const createFormProps = computed<ProFormProps>(() => ({
    ...create.value,
    options: options.value,
    action: false,
    onSubmit: submit,
  }))

  const openCreateDialog = () => {
    createDialogVisible.value = true
  }

  const submit: ProFormSubmit = (done, isValid, fields) => {
    if (isValid) {
      if (createRequest) {
        createRequest({ params: fields, done })
      } else {
        done()
      }
    }
  }

  return {
    createDialogVisible,
    createVisible,
    createText,
    createFormProps,
    openCreateDialog,
  }
}

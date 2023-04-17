import type { Ref } from 'vue'
import { ref, computed } from 'vue'

import type { ProCrudColumn, ProCrudCreate, ProCrudCreateEvent } from '../types'
import type { ProFormProps, ProFormOption } from '../../pro-form/types'
import { isBoolean } from '../../../utils'

/**
 * 新增数据
 */
export const useCreate = (
  create: Ref<ProCrudCreate>,
  columns: Ref<ProCrudColumn[]>,
  emit: (event: 'create', ...args: any[]) => void
) => {
  /** 新增数据对话框是否显示 */
  const createDialogVisible = ref(false)

  const createFields = ref({})

  const updateCreateFields: ProFormProps['onUpdate:modelValue'] = (value) => {
    createFields.value = value
  }

  /** 新增数据功能是否显示 */
  const createVisible = computed(() => columns.value.some((column) => !!column.create))

  /** 新增按钮文本 */
  const createButtonText = computed(() => create.value.buttonText || '新增')

  /** 新增对话框标题 */
  const createTitle = computed(() => create.value.title || '新增')

  /** ProForm options */
  const options = computed(() =>
    columns.value.reduce<ProFormOption[]>((prev, column) => {
      const { create: createProps } = column

      if (isBoolean(createProps) && createProps) {
        prev.push({
          type: 'input',
          prop: column.prop || '',
          label: column.label || '',
        })
      } else if (createProps) {
        const option: ProFormOption = {
          ...createProps,
          prop: column.prop ?? '',
          label: column.label,
        }

        prev.push(option)
      }

      return prev
    }, [])
  )

  /** 新增表单组件 props */
  const createFormProps = computed<ProFormProps>(() => ({
    ...create.value,
    modelValue: createFields.value,
    options: options.value,
    action: false,
    'onUpdate:modelValue': updateCreateFields,
  }))

  /** 打开新建数据对话框 */
  const openCreateDialog = () => {
    createDialogVisible.value = true
  }

  const createRequest: ProCrudCreateEvent = (payload) => {
    emit('create', payload)
  }

  return {
    createDialogVisible,
    createVisible,
    createTitle,
    createButtonText,
    createFormProps,
    openCreateDialog,
    createRequest,
  }
}

import type { Ref } from 'vue'
import { ref, computed } from 'vue'

import type { ProCrudColumn, ProCrudCreate } from '../types'
import type { ProFormProps, ProFormOption, ProFormSubmit, ProFormDone } from '../../pro-form/types'
import { isUndefined, isBoolean } from '../../../utils'

/**
 * 新增数据
 */
export const useCreate = (
  create: Ref<ProCrudCreate>,
  columns: Ref<ProCrudColumn[]>,
  emit: (event: 'create', ...args: any[]) => void,
  refreshRequest: () => void
) => {
  /** 新增数据对话框是否显示 */
  const createDialogVisible = ref(false)

  /** 新增数据功能是否显示 */
  const createVisible = computed(() => columns.value.some((column) => !isUndefined(column.create)))

  /** 新增按钮文本 */
  const createButtonText = computed(() => create.value.buttonText ?? '新增')

  /** 新增对话框标题 */
  const createTitle = computed(() => create.value.title ?? '新增')

  /** ProForm options */
  const options = computed(() =>
    columns.value.reduce<ProFormOption[]>((prev, column) => {
      const { create: createProps } = column

      if (isBoolean(createProps) && createProps) {
        prev.push({
          type: 'input',
          prop: column.prop ?? '',
          label: column.label ?? '',
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

  /** 新增表单属性 */
  const createFormProps = computed<ProFormProps>(() => {
    const config: ProFormProps = {
      ...create.value,
      options: options.value,
      action: false,
      onSubmit: submit,
    }

    if (!create.value.inline && isUndefined(create.value.labelWidth)) {
      config.labelWidth = 60
    }

    return config
  })

  const openCreateDialog = () => {
    createDialogVisible.value = true
  }

  /**
   * 代理表单 done 方法
   * 同时关闭对话框
   */
  const createDone = (done: ProFormDone) => {
    return () => {
      done()
      createDialogVisible.value = false
      refreshRequest()
    }
  }

  const submit: ProFormSubmit = (done, isValid, fields) => {
    if (isValid) {
      const doneFunc = createDone(done)

      emit('create', { params: fields, done: doneFunc })
    }
  }

  return {
    createDialogVisible,
    createVisible,
    createTitle,
    createButtonText,
    createFormProps,
    openCreateDialog,
  }
}

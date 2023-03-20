<template>
  <pro-dialog
    v-model="visible"
    v-model:fullscreen="fullscreen"
    :title="title"
    :before-confirm="beforeConfirm"
    @closed="onClosed"
    @cancel="onCancel"
  >
    <pro-form ref="formRef" v-bind="formProps" />
  </pro-dialog>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, computed } from 'vue'

import type { ProFormProps } from '../../pro-form/types'
import type { ProDialogBeforeConfirm } from '../../pro-dialog/types'
import type { ProCrudEditEvent, Data } from '../types'
import ProDialog from '../../pro-dialog/pro-dialog.vue'
import ProForm from '../../pro-form/pro-form.vue'

const props = defineProps({
  /** 是否显示对话框 v-model */
  modelValue: { type: Boolean },
  /** 标题 */
  title: { type: String, default: '' },
  /** 编辑的表格行 */
  row: { type: Object as PropType<Data | null> },
  /** ProForm props */
  formProps: { type: Object as PropType<ProFormProps>, default: () => ({}) },
  /** 编辑数据回调方法 */
  editRequest: { type: Function as PropType<ProCrudEditEvent>, default: () => {} },
})

const emit = defineEmits(['update:modelValue'])

const fullscreen = ref(false)
const formRef = ref<InstanceType<typeof ProForm> | null>(null)

/** 是否显示对话框 */
const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const onClosed = () => {
  fullscreen.value = false
  formRef.value?.resetFields()
}

const onCancel = () => {
  visible.value = false
  formRef.value?.resetFields()
}

const beforeConfirm: ProDialogBeforeConfirm = (loading, done) => {
  if (formRef.value && props.row) {
    const row = props.row

    formRef.value.validate((isValid) => {
      if (isValid) {
        props.editRequest({
          row,
          params: props.formProps.modelValue || {},
          loading,
          done,
        })
      }
    })
  }
}
</script>

<template>
  <pro-dialog
    v-model="visible"
    v-model:fullscreen="fullscreen"
    :title="title"
    :before-confirm="beforeConfirm"
    @cancel="closeDialog"
    @closed="onClosed"
  >
    <pro-form ref="formRef" v-bind="formProps" />
  </pro-dialog>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, computed } from 'vue'

import type { ProFormProps } from '../../pro-form/types'
import type { ProDialogBeforeConfirm } from '../../pro-dialog/types'
import type { ProCrudCreateEvent } from '../types'
import ProDialog from '../../pro-dialog/pro-dialog.vue'
import ProForm from '../../pro-form/pro-form.vue'

const props = defineProps({
  /** 是否显示对话框 v-model */
  modelValue: { type: Boolean },
  /** 新增对话框标题 */
  title: { type: String, default: '' },
  /** ProForm props */
  formProps: { type: Object as PropType<ProFormProps>, default: () => ({}) },
  /** 新增数据回调方法 */
  createRequest: { type: Function as PropType<ProCrudCreateEvent>, default: () => {} },
  /** 刷新 Crud */
  refreshRequest: { type: Function as PropType<() => void>, default: () => {} },
})

const emit = defineEmits(['update:modelValue'])

const fullscreen = ref(false)
const formRef = ref<InstanceType<typeof ProForm> | null>(null)

/** 对话框是否显示 */
const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const onClosed = () => {
  // 关闭对话框需要取消全屏
  fullscreen.value = false
  formRef.value?.resetFields()
}

/** 关闭对话框需要做清理工作 */
const closeDialog = () => {
  visible.value = false
  formRef.value?.resetFields()
}

const beforeConfirm: ProDialogBeforeConfirm = (loading, done) => {
  if (formRef.value) {
    formRef.value.validate((isValid) => {
      if (isValid) {
        const doneFunc = () => {
          done()
          props.refreshRequest()
        }

        props.createRequest({ params: props.formProps.modelValue || {}, loading, done: doneFunc })
      }
    })
  }
}
</script>

<template>
  <pro-dialog
    v-model="visible"
    v-model:fullscreen="fullscreen"
    :title="title"
    width="30%"
    @cancel="closeDialog"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <pro-form ref="formRef" v-bind="formProps" />
  </pro-dialog>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, computed } from 'vue'

import type { ProFormProps } from '../../pro-form/types'
import ProDialog from '../../pro-dialog/pro-dialog.vue'
import ProForm from '../../pro-form/pro-form.vue'

const props = defineProps({
  modelValue: { type: Boolean },
  /** 新增对话框标题 */
  title: { type: String, default: '' },
  /** ProForm props */
  formProps: { type: Object as PropType<ProFormProps>, default: () => ({}) },
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

const onConfirm = () => {
  formRef.value?.submit()
}
</script>

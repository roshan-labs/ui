<template>
  <pro-dialog
    v-model="visible"
    v-model:fullscreen="fullscreen"
    width="30%"
    :title="title"
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
import ProDialog from '../../pro-dialog/pro-dialog.vue'
import ProForm from '../../pro-form/pro-form.vue'

const props = defineProps({
  /** 是否显示对话框 v-model */
  modelValue: { type: Boolean },
  /** 标题 */
  title: { type: String, default: '' },
  /** ProForm props */
  formProps: { type: Object as PropType<ProFormProps>, default: () => ({}) },
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
</script>

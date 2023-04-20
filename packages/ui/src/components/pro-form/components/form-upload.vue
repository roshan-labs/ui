<template>
  <el-upload v-bind="$attrs" v-model:file-list="fileList">
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.trigger" #trigger>
      <slot name="trigger" />
    </template>
    <template v-if="$slots.tip" #tip>
      <slot name="tip" />
    </template>
    <template v-if="$slots.file" #file="slotProps">
      <slot name="file" v-bind="slotProps" />
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
/**
 * 这个组件用来转化 v-model:file-list 到 v-model
 */
import type { PropType } from 'vue'
import type { UploadUserFile } from 'element-plus'
import { computed } from 'vue'
import { ElUpload } from 'element-plus'

const props = defineProps({
  modelValue: { type: Array as PropType<UploadUserFile[]>, default: () => [] },
})

const emit = defineEmits(['update:modelValue'])

const fileList = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

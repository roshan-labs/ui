<template>
  <el-dialog v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name">
      <slot :name="name" />
    </template>
    <template #footer>
      <slot name="footer">
        <el-button @click="$emit('cancel')">{{ cancelText }}</el-button>
        <el-button type="primary" @click="$emit('confirm')">{{ confirmText }}</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElDialog, ElButton } from 'element-plus'

defineProps({
  /** 取消按钮文本 */
  cancelText: { type: String, default: '取消' },
  /** 确定按钮文本 */
  confirmText: { type: String, default: '确定' },
})

defineEmits(['cancel', 'confirm'])
</script>

<template>
  <el-dialog v-bind="$attrs" v-model="visible" class="pro-dialog" :fullscreen="_fullscreen">
    <template #header="{ titleId, titleClass }">
      <span :id="titleId" :class="titleClass" role="heading">{{ title }}</span>
      <button class="fullscreen" @click="_fullscreen = !_fullscreen">
        <el-icon :size="16" color="var(--el-color-info)"><full-screen /></el-icon>
      </button>
    </template>
    <!-- @slot 对话框内容 -->
    <slot />
    <template #footer>
      <!-- @slot 对话框尾部自定义区域 -->
      <slot name="footer" v-bind="footProps">
        <el-button @click="onCancel">{{ cancelText }}</el-button>
        <el-button type="primary" :loading="loading" @click="onConfirm">
          {{ confirmText }}
        </el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElDialog, ElButton, ElIcon } from 'element-plus'
import { FullScreen } from '@element-plus/icons-vue'
import { useVModel } from '@vueuse/core'

import type { ProDialogBeforeConfirm } from './types'

export interface Props {
  /** 是否显示对话框 */
  modelValue?: boolean
  /** 对话框标题 */
  title?: string
  /** 取消按钮文本 */
  cancelText?: string
  /** 确定按钮文本 */
  confirmText?: string
  /** 是否为全屏 */
  fullscreen?: boolean
  /** 提交前回调方法 */
  beforeConfirm?: ProDialogBeforeConfirm
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  cancelText: '取消',
  confirmText: '确定',
})

const emit = defineEmits<{
  /** 更新显示对话框状态事件 */
  (event: 'update:modelValue', value: boolean): void
  /** 更新是否全屏状态事件 */
  (event: 'update:fullscreen', value: boolean): void
  /** 点击 cancel 按钮事件 */
  (event: 'cancel'): void
  /** 点击 confirm 按钮事件 */
  (event: 'confirm'): void
}>()

const visible = useVModel(props, 'modelValue', emit, { passive: true })
const _fullscreen = useVModel(props, 'fullscreen', emit, { passive: true })

const loading = ref(false)

const footProps = computed(() => ({
  confirmText: props.confirmText,
  cancelText: props.cancelText,
  onConfirm,
  onCancel,
}))

const onCancel = () => {
  visible.value = false
  emit('cancel')
}

const done = () => {
  visible.value = false
  emit('confirm')
}

const onConfirm = () => {
  if (props.beforeConfirm) {
    props.beforeConfirm(loading, done)
  } else {
    visible.value = false
    emit('confirm')
  }
}
</script>

<style>
.pro-dialog.is-fullscreen {
  display: flex;
  flex-direction: column;
}

.pro-dialog.is-fullscreen .el-dialog__body {
  flex: 1;
}
</style>

<style scoped>
.fullscreen {
  position: absolute;
  top: 6px;
  right: 36px;
  z-index: 1;
  width: 54px;
  height: 54px;
  cursor: pointer;
}

.fullscreen:hover .el-icon,
.fullscreen:focus .el-icon {
  color: var(--el-color-primary);
}
</style>

<template>
  <el-dialog v-bind="$attrs" class="pro-dialog" :fullscreen="fullscreenCollapse">
    <template #header="{ titleId, titleClass }">
      <span :id="titleId" :class="titleClass" role="heading">{{ title }}</span>
      <button class="fullscreen" @click="changeFullscreen">
        <el-icon :size="16" color="var(--el-color-info)"><full-screen /></el-icon>
      </button>
    </template>
    <slot />
    <template #footer>
      <slot name="footer" v-bind="footProps">
        <el-button @click="onCancel">{{ cancelText }}</el-button>
        <el-button type="primary" @click="onConfirm">{{ confirmText }}</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, toRef } from 'vue'
import { ElDialog, ElButton, ElIcon } from 'element-plus'
import { FullScreen } from '@element-plus/icons-vue'

import { useFullscreen } from './composables/use-fullscreen'

const props = defineProps({
  /** 对话框标题 */
  title: { type: String, default: '' },
  /** 取消按钮文本 */
  cancelText: { type: String, default: '取消' },
  /** 确定按钮文本 */
  confirmText: { type: String, default: '确定' },
  /** 是否为全屏 */
  fullscreen: { type: Boolean },
})

const emit = defineEmits(['cancel', 'confirm'])

const { fullscreenCollapse, changeFullscreen } = useFullscreen(toRef(props, 'fullscreen'))

const footProps = computed(() => ({
  confirmText: props.confirmText,
  cancelText: props.cancelText,
  onConfirm,
  onCancel,
}))

const onConfirm = () => {
  emit('confirm')
}

const onCancel = () => {
  emit('cancel')
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

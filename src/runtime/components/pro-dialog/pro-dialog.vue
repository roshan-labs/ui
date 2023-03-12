<template>
  <el-dialog v-bind="$attrs" v-model="visible" class="pro-dialog" :fullscreen="_fullscreen">
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
        <el-button type="primary" :loading="loading" @click="onConfirm">{{
          confirmText
        }}</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, computed, watch, toRef } from 'vue'
import { ElDialog, ElButton, ElIcon } from 'element-plus'
import { FullScreen } from '@element-plus/icons-vue'

import type { ProDialogBeforeConfirm } from './types'
import { useFullscreen } from './composables/use-fullscreen'

const props = defineProps({
  /** 是否显示对话框 */
  modelValue: { type: Boolean },
  /** 对话框标题 */
  title: { type: String, default: '' },
  /** 取消按钮文本 */
  cancelText: { type: String, default: '取消' },
  /** 确定按钮文本 */
  confirmText: { type: String, default: '确定' },
  /** 是否为全屏 */
  fullscreen: { type: Boolean },
  /** 提交前回调方法 */
  beforeConfirm: { type: Function as PropType<ProDialogBeforeConfirm> },
})

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm', 'update:fullscreen'])

const { _fullscreen, changeFullscreen } = useFullscreen(toRef(props, 'fullscreen'), emit)

const visible = ref(props.modelValue)
const loading = ref(false)

const footProps = computed(() => ({
  confirmText: props.confirmText,
  cancelText: props.cancelText,
  onConfirm,
  onCancel,
}))

watch(
  () => props.modelValue,
  (value) => {
    visible.value = value
  }
)

watch(visible, (value) => {
  emit('update:modelValue', value)
})

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

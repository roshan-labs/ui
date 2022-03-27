<template>
  <span ref="rootNode" :class="classes">
    <img v-if="src" :src="src" :srcset="srcSet" :alt="alt" />
    <n-icon v-if="$slots.icon">
      <slot name="icon" />
    </n-icon>
    <span v-if="$slots.default" ref="textNode" :style="textStyle">
      <slot />
    </span>
  </span>
</template>

<script lang="ts" setup>
import type { PropType, StyleValue } from 'vue'
import { ref, computed, useSlots, onBeforeUpdate } from 'vue'

import NIcon from '../icon/icon.vue'

const props = defineProps({
  /** 图片类头像的资源地址 */
  src: { type: String, default: '' },
  /** 设置图片类头像响应式资源地址 */
  srcSet: { type: String, default: '' },
  /** 图像无法显示时的替代文本 */
  alt: { type: String, default: '' },
  /** 指定头像的形状 */
  shape: { type: String as PropType<'circle' | 'square'>, default: 'circle' },
  /** 字符类型距离左右两侧边界单位像素 */
  gap: { type: Number, default: 4 },
})

const rootNode = ref<HTMLElement | null>(null)
const textNode = ref<HTMLElement | null>(null)
const slots = useSlots()
const hasIcon = ref(!!slots.icon)

const classes = computed(() => ({
  'n-avatar': true,
  'n-avatar-image': props.src,
  'n-avatar-square': props.shape === 'square',
  'n-avatar-icon': hasIcon.value,
}))

const textStyle = computed<StyleValue>(() => {
  const result: StyleValue = {}

  if (rootNode.value && textNode.value) {
    const rootWidth = rootNode.value.offsetWidth
    const textWidth = textNode.value.offsetWidth

    result.transform = `scale(${
      rootWidth - props.gap * 2 < textWidth ? (rootWidth - props.gap * 2) / textWidth : 1
    })`
  }

  return result
})

onBeforeUpdate(() => {
  hasIcon.value = !!slots.icon
})
</script>

<style>
.n-avatar {
  @apply inline-flex items-center justify-center w-base h-base rounded-1/2 overflow-hidden p-0 text-base text-white whitespace-nowrap align-middle bg-[#ccc];
}

.n-avatar-image {
  @apply bg-transparent children:(block w-full h-full object-cover);
}

.n-avatar-square {
  @apply rounded;
}

.n-avatar-icon {
  @apply text-[18px];
}
</style>

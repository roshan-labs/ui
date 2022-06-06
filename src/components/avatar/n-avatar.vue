<template>
  <span ref="rootNode" :class="classes">
    <img
      v-if="(src || srcSet) && !hasImageError"
      :src="src"
      :srcset="srcSet"
      :alt="alt"
      @error="onError"
    />
    <n-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </n-icon>
    <span v-else ref="textNode" :style="textStyle">
      <slot />
    </span>
  </span>
</template>

<script lang="ts" setup>
import type { PropType, StyleValue, Component } from 'vue'
import { ref, computed, useSlots, onBeforeUpdate } from 'vue'

import NIcon from '../icon/n-icon.vue'

const props = defineProps({
  /** 图片类头像的资源地址 */
  src: { type: String, default: '' },
  /** 设置图片类头像响应式资源地址 */
  srcSet: { type: String, default: '' },
  /** 图像无法显示时的替代文本 */
  alt: { type: String, default: '' },
  /** 设置头像的自定义图标 */
  icon: { type: Object as PropType<Component | null>, default: null },
  /** 指定头像的形状 */
  shape: { type: String as PropType<'circle' | 'square'>, default: 'circle' },
  /** 字符类型距离左右两侧边界单位像素 */
  gap: { type: Number, default: 4 },
  /** 设置头像的大小 */
  size: {
    type: [Number, String] as PropType<number | 'large' | 'default' | 'small'>,
    default: 'default',
  },
})

const emit = defineEmits(['error'])

const rootNode = ref<HTMLElement | null>(null)
const textNode = ref<HTMLElement | null>(null)
const slots = useSlots()
/** 是否有 icon 插槽 */
const hasIcon = ref(!!slots.icon)
/** 图片是否加载错误 */
const hasImageError = ref(false)

const hasImage = computed(() => (props.src || props.srcSet) && !hasImageError.value)

const classes = computed(() => ({
  'n-avatar': true,
  'n-avatar-image': hasImage.value,
  'n-avatar-square': props.shape === 'square',
  'n-avatar-icon': hasIcon.value || !!props.icon,
  'n-avatar-small': props.size === 'small',
  'n-avatar-large': props.size === 'large',
  'n-avatar-icon-small': hasIcon.value && props.size === 'small',
  'n-avatar-icon-large': hasIcon.value && props.size === 'large',
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

const onError = (e: Event) => {
  hasImageError.value = true
  emit('error', e)
}
</script>

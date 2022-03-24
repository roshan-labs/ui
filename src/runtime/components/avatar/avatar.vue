<template>
  <span :class="classes">
    <img v-if="src" :src="src" :srcset="srcSet" :alt="alt" />
  </span>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  /** 图片类头像的资源地址 */
  src: { type: String, default: '' },
  /** 设置图片类头像响应式资源地址 */
  srcSet: { type: String, default: '' },
  /** 图像无法显示时的替代文本 */
  alt: { type: String, default: '' },
  /** 指定头像的形状 */
  shape: { type: String as PropType<'circle' | 'square'>, default: 'circle' },
})

const classes = computed(() => ({
  'n-avatar': true,
  'n-avatar-image': props.src,
}))
</script>

<style>
.n-avatar {
  @apply relative inline-block w-base h-base leading-[32px] rounded-1/2 overflow-hidden p-0 m-0 text-base text-white tabular-nums whitespace-nowrap text-center align-middle bg-[#ccc];
}

.n-avatar-image {
  @apply bg-transparent children:(block w-full h-full object-cover);
}
</style>

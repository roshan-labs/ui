<template>
  <div style="position: relative">
    <slot />
    <div :style="styles"></div>
  </div>
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue'
import { ref, computed, watchEffect } from 'vue'
import { useDevicePixelRatio } from '@vueuse/core'

const props = defineProps({
  /** 文字内容 */
  content: { type: String, default: '' },
  /** 水印的 z-index 属性 */
  zIndex: { type: Number, default: 9 },
  /** 水印旋转角度 */
  rotate: { type: Number, default: -22 },
})

const image = ref('')
const { pixelRatio } = useDevicePixelRatio()

const width = computed(() => Math.floor(120 * pixelRatio.value))
const height = computed(() => Math.floor(64 * pixelRatio.value))
const fontSize = computed(() => Math.floor(16 * pixelRatio.value))

const styles = computed<StyleValue>(() => ({
  position: 'absolute',
  zIndex: props.zIndex,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  backgroundRepeat: 'repeat',
  backgroundPosition: '0px 0px',
  // backgroundSize: `${}`,
  backgroundImage: `url(${image.value})`,
}))

watchEffect(() => {
  if (props.content.trim() && window) {
    const canvas = window.document.createElement('canvas')

    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.canvas.width = width.value
      ctx.canvas.height = height.value

      ctx.font = `${fontSize.value}px sans-serif`
      ctx.textBaseline = 'bottom'
      ctx.fillStyle = 'rgba(0,0,0,.15)'
      ctx.rotate((props.rotate * Math.PI) / 180)
      ctx.fillText(props.content, 0, height.value)

      image.value = ctx.canvas.toDataURL('image/png')
    }

    if (canvas) {
      canvas.remove()
    }
  }
})
</script>

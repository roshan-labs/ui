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
  /** 水印宽度 */
  width: { type: Number, default: 120 },
  /** 水印高度 */
  height: { type: Number, default: 64 },
})

const { pixelRatio } = useDevicePixelRatio()
const image = ref('')

const width = computed(() => Math.floor(props.width * pixelRatio.value))
const height = computed(() => Math.floor(props.height * pixelRatio.value))
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
  backgroundImage: `url(${image.value})`,
}))

/** 渲染文本水印 */
const renderText = (ctx: CanvasRenderingContext2D) => {
  ctx.font = `${fontSize.value}px sans-serif`
  ctx.fillStyle = 'rgba(0,0,0,.15)'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.translate(Math.floor(width.value / 2), Math.floor(height.value / 2))
  ctx.rotate((props.rotate * Math.PI) / 180)
  ctx.fillText(props.content, 0, 0)
}

watchEffect(() => {
  if (props.content.trim() && window) {
    const canvas = window.document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.canvas.width = width.value
      ctx.canvas.height = height.value

      renderText(ctx)

      image.value = ctx.canvas.toDataURL('image/png')
    }

    if (canvas) {
      canvas.remove()
    }
  }
})
</script>

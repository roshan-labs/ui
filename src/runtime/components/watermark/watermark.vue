<template>
  <div style="position: relative">
    <slot />
    <div :style="styles"></div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType, StyleValue } from 'vue'
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
  width: { type: Number },
  /** 水印高度 */
  height: { type: Number },
  /** 水印之间间距 */
  gap: { type: Array as PropType<number[]>, default: () => [100, 100] },
})

const { pixelRatio } = useDevicePixelRatio()
const image = ref('')
const bgSize = ref(0)

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
  backgroundSize: `${bgSize.value}px`,
  backgroundImage: `url(${image.value})`,
}))

/** 渲染文本水印 */
const renderText = (ctx: CanvasRenderingContext2D) => {
  const gapX = props.gap[0] ?? 0
  const gapY = props.gap[1] ?? 0

  ctx.font = `${fontSize.value}px normal sans-serif`
  const text = ctx.measureText(props.content)
  const textWidth = Math.floor(text.actualBoundingBoxLeft + text.actualBoundingBoxRight)
  console.log(textWidth, fontSize.value, props.content, pixelRatio.value)
  const cssWidth = textWidth * 2 + gapX * 2

  const height = (16 * 2 + gapY * 2) * pixelRatio.value

  ctx.canvas.width = cssWidth * pixelRatio.value
  ctx.canvas.height = height
  bgSize.value = cssWidth

  ctx.fillStyle = 'rgba(0,0,0,.15)'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.save()

  // 绘制第一个水印
  ctx.translate(
    Math.floor((gapX / 2 + textWidth / 2) * pixelRatio.value),
    Math.floor((gapY / 2 + 16 / 2) * pixelRatio.value)
  )
  ctx.rotate((props.rotate * Math.PI) / 180)
  ctx.fillText(props.content, 0, 0)
}

watchEffect(() => {
  if (props.content.trim() && window) {
    const canvas = window.document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (ctx) {
      renderText(ctx)

      image.value = ctx.canvas.toDataURL('image/png')
    }

    if (canvas) {
      canvas.remove()
    }
  }
})
</script>

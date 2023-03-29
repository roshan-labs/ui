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
  const gapX = (props.gap[0] ?? 0) * pixelRatio.value
  const gapY = (props.gap[1] ?? 0) * pixelRatio.value
  const rotate = (props.rotate * Math.PI) / 180
  const font = `normal ${fontSize.value}px sans-serif`

  // 计算文本宽高
  ctx.font = font
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const textMetrics = ctx.measureText(props.content)
  const textWidth = Math.floor(
    textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight
  )
  const textHeight = Math.floor(
    textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent
  )

  // 设置画布宽高
  const width = textWidth * 2 + gapX * 2
  const height = textHeight * 2 + gapY * 2

  ctx.canvas.width = width
  ctx.canvas.height = height
  bgSize.value = Math.floor(width / pixelRatio.value)

  ctx.font = font
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'rgba(0,0,0,.15)'

  ctx.save()

  // 绘制第一个水印
  ctx.translate(Math.floor(gapX / 2 + textWidth / 2), Math.floor(gapY / 2 + textHeight / 2))
  ctx.rotate(rotate)
  ctx.fillText(props.content, 0, 0)

  ctx.restore()

  // 绘制第二个水印
  ctx.translate(
    Math.floor(gapX + gapX / 2 + textWidth + textWidth / 2),
    Math.floor(gapY / 2 + gapY + textHeight + textHeight / 2)
  )
  ctx.rotate(rotate)
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

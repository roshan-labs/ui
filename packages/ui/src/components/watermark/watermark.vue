<template>
  <div style="position: relative">
    <!-- @slot 需要添加水印的内容 -->
    <slot />
    <div :style="styles"></div>
  </div>
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue'
import { ref, computed, watchEffect } from 'vue'
import { useDevicePixelRatio } from '@vueuse/core'

import type { WatermarkFont } from './types'

export interface Props {
  /** 文字水印内容 */
  content?: string
  /** 水印的 z-index 属性 */
  zIndex?: number
  /** 水印旋转角度 */
  rotate?: number
  /** 水印宽度 */
  width?: number
  /** 水印高度 */
  height?: number
  /** 字体配置 */
  font?: WatermarkFont
  /** 水印之间间距 */
  gap?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  zIndex: 9,
  rotate: -22,
  font: () => ({}),
  gap: () => [100, 100],
})

const { pixelRatio } = useDevicePixelRatio()
const image = ref('')
const bgSize = ref(0)

const fontConfig = computed(() => ({
  color: 'rgba(0,0,0,.15)',
  fontFamily: 'sans-serif',
  fontSize: 16,
  fontWeight: 'normal',
  fontStyle: 'normal',
  ...props.font,
}))
const fontSize = computed(() => Math.floor(fontConfig.value.fontSize * pixelRatio.value))

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
  const font = `${fontConfig.value.fontStyle} ${fontConfig.value.fontWeight} ${fontSize.value}px ${fontConfig.value.fontFamily}`

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
  ctx.fillStyle = fontConfig.value.color

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

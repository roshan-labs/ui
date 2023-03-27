<template>
  <div style="position: relative">
    <slot />
    <div :style="styles"></div>
  </div>
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue'
import { ref, computed, watchEffect } from 'vue'

const props = defineProps({
  /** 文字内容 */
  content: { type: String, default: '' },
})

const image = ref('')

const styles = computed<StyleValue>(() => ({
  position: 'absolute',
  zIndex: 9,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  backgroundRepeat: 'repeat',
  backgroundPosition: '0px 0px',
  backgroundSize: '100px 100px',
  backgroundImage: `url(${image.value})`,
}))

watchEffect(() => {
  if (props.content.trim() && window) {
    const canvas = window.document.createElement('canvas')

    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.canvas.width = 120
      ctx.canvas.height = 64

      ctx.font = '14px sans-serif'
      ctx.fillStyle = 'rgba(0,0,0,.15)'
      ctx.rotate(-22 * (Math.PI / 180))
      ctx.fillText(props.content, 0, 64)

      image.value = ctx.canvas.toDataURL('image/png')
    }

    if (canvas) {
      canvas.remove()
    }
  }
})
</script>

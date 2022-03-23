<template>
  <i class="n-icon" :style="style">
    <slot />
  </i>
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  /** 颜色 */
  color: { type: String, default: '' },
  /** 尺寸 */
  size: { type: [String, Number], default: '' },
})

const style = computed<StyleValue>(() => {
  const result: StyleValue = {}

  if (props.color) {
    result.color = props.color
  }

  if (props.size) {
    result.fontSize = props.size
  }

  return result
})
</script>

<style>
.n-icon {
  @apply relative inline-flex justify-center items-center fill-current svg:(w-[1em] h-[1em]);
}
</style>

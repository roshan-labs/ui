<template>
  <div class="n-space" :style="style">
    <div v-for="(child, index) in childs" :key="index">
      <component :is="child" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType, StyleValue } from 'vue'
import { ref, computed, useSlots, onUpdated } from 'vue'

import { filterChildren } from '../utils/utils'

type Size = 'small' | 'default' | 'large' | number

const props = defineProps({
  /** 间距大小 */
  size: {
    type: [String, Number, Array] as PropType<Size | Size[]>,
    default: 'small',
  },
  /** 对齐方式 */
  align: { type: String as PropType<'start' | 'end' | 'center' | 'baseline'>, default: 'center' },
})

// Slot
const slots = useSlots()
console.log(slots.default?.())
const genChilds = () => filterChildren(slots.default?.())
const childs = ref(genChilds())

onUpdated(() => {
  childs.value = genChilds()
})

// Size
const sizeMap = {
  small: '8px',
  default: '16px',
  large: '24px',
}
const gap = computed(() => {
  let value = ''

  if (Array.isArray(props.size)) {
    const [y, x] = props.size
    const yValue = typeof y === 'number' ? `${y}px` : sizeMap[y]
    const xValue = typeof x === 'number' ? `${x}px` : sizeMap[x]

    value = `${yValue} ${xValue}`
  } else {
    value = typeof props.size === 'number' ? `${props.size}px` : sizeMap[props.size]
  }

  return value
})

const style = computed<StyleValue>(() => ({
  gap: gap.value,
  alignItems: props.align,
}))
</script>

<style>
.n-space {
  @apply inline-flex;
}
</style>

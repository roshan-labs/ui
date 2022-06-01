<template>
  <div :class="classes" :style="style">
    <template v-for="(child, index) in childs" :key="index">
      <div v-if="(split || $slots.split) && index > 0" class="n-space-item-split">
        <slot name="split">{{ split }}</slot>
      </div>
      <div class="n-space-item">
        <component :is="child" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { PropType, StyleValue, VNode } from 'vue'
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
  align: { type: String as PropType<'start' | 'end' | 'center' | 'baseline'> },
  /** 间距方向 */
  direction: { type: String as PropType<'vertical' | 'horizontal'>, default: 'horizontal' },
  /** 是否自动换行，仅在 horizontal 时有效 */
  wrap: { type: Boolean, default: false },
  /** 分隔符 */
  split: { type: [String, Object] as PropType<string | VNode> },
})

// Slot
const slots = useSlots()
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

const style = computed<StyleValue>(() => ({ gap: gap.value }))

const classes = computed(() => ({
  'n-space': true,
  'n-space-vertical': props.direction === 'vertical',
  'n-space-horizontal': props.direction === 'horizontal',
  'n-space-align-start': props.align === 'start',
  'n-space-align-end': props.align === 'end',
  'n-space-align-center': props.align === 'center',
  'n-space-align-baseline': props.align === 'baseline',
  'n-space-wrap': props.direction === 'horizontal' && props.wrap,
}))
</script>

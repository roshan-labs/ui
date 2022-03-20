<template>
  <div :class="classes">
    <span v-if="type === 'horizontal' && hasSlot" class="n-divider-inner-text" :style="innerStyle">
      <slot />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { PropType, StyleValue, computed, useSlots, ref, onBeforeUpdate } from 'vue'

import { VueClass } from '../utils/types'
import { filterChildren } from '../utils/utils'

const props = defineProps({
  /** 水平还是垂直类型 */
  type: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
  /** 是否虚线 */
  dashed: { type: Boolean, default: false },
  /** 分割线标题的位置 */
  orientation: { type: String as PropType<'left' | 'right' | 'center'>, default: 'center' },
  /** 标题和最近 left/right 边框之间的距离，去除了分割线，同时 orientation 必须为 left 或 right */
  orientationMargin: { type: [String, Number], default: '' },
  /** 文字是否显示为普通正文样式 */
  plain: { type: Boolean, default: false },
})

const hasSlot = ref(filterChildren(useSlots().default?.()).length > 0)

const hasOrientationLeft = computed(
  () =>
    props.type === 'horizontal' &&
    hasSlot.value &&
    props.orientation === 'left' &&
    props.orientationMargin !== ''
)
const hasOrientationRight = computed(
  () =>
    props.type === 'horizontal' &&
    hasSlot.value &&
    props.orientation === 'right' &&
    props.orientationMargin !== ''
)

const classes = computed<VueClass>(() => ({
  'n-divider': true,
  'n-divider-horizontal': props.type === 'horizontal',
  'n-divider-vertical': props.type === 'vertical',
  'n-divider-dashed': props.dashed,
  'n-divider-text': props.type === 'horizontal' && hasSlot.value,
  'n-divider-text-dashed': props.dashed && hasSlot.value,
  'n-divider-text-left': props.type === 'horizontal' && props.orientation === 'left',
  'n-divider-text-right': props.type === 'horizontal' && props.orientation === 'right',
  'n-divider-plain': props.plain,
  'n-divider-orientation-left': hasOrientationLeft.value,
  'n-divider-orientation-right': hasOrientationRight.value,
}))

const innerStyle = computed<StyleValue>(() => {
  const style: StyleValue = {}

  if (hasOrientationLeft.value) {
    style.marginLeft = `${props.orientationMargin}px`
  }

  if (hasOrientationRight.value) {
    style.marginRight = `${props.orientationMargin}px`
  }

  return style
})

// 确保插槽内容变更时判断正确
onBeforeUpdate(() => {
  hasSlot.value = filterChildren(useSlots().default?.()).length > 0
})
</script>

<template>
  <i class="n-icon" :style="style">
    <slot>
      <component :is="component" v-if="component" />
    </slot>
  </i>
</template>

<script lang="ts" setup>
import type { PropType, Component, StyleValue } from 'vue'
import { computed } from 'vue'

import { addUnit } from '../utils/utils'

const props = defineProps({
  /** 颜色 */
  color: { type: String, default: '' },
  /** 尺寸 */
  size: { type: [String, Number], default: '' },
  /** 图标组件 */
  component: { type: Object as PropType<Component> },
})

const style = computed<StyleValue>(() => {
  const result: StyleValue = {}

  if (props.color) {
    result.color = props.color
  }

  if (props.size) {
    result.fontSize = addUnit(props.size)
  }

  return result
})
</script>

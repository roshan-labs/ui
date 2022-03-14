<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue'

const props = defineProps({
  /** 水平还是垂直类型 */
  type: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
})

const classes = computed(() => ({
  'n-divider': true,
  'n-divider-horizontal': props.type === 'horizontal',
  'n-divider-vertical': props.type === 'vertical',
}))
</script>

<style>
.n-divider {
  @apply p-0 text-content text-base border-t;
}
</style>

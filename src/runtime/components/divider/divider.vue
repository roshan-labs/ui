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
  /** 是否虚线 */
  dashed: { type: Boolean, default: false },
})

const classes = computed(() => ({
  'n-divider': true,
  'n-divider-horizontal': props.type === 'horizontal',
  'n-divider-vertical': props.type === 'vertical',
  'n-divider-dashed': props.dashed,
}))
</script>

<style>
.n-divider {
  @apply box-border p-0 m-0 text-content text-base tabular-nums leading-base list-none border-t border-solid border-[rgba(0,0,0,.06)];
}

.n-divider-horizontal {
  @apply flex clear-both w-full min-w-full my-lg;
}

.n-divider-vertical {
  @apply relative top-[-0.06em] inline-block h-[0.9em] mx-xs align-middle border-t-0 border-l;
}

.n-divider-dashed {
  @apply bg-transparent border-[#0000000f] border-dashed;
}
</style>

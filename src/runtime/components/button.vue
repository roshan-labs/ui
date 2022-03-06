<template>
  <button :class="classes">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'

const props = defineProps({
  type: { type: String as PropType<'default' | 'primary' | 'dashed'>, default: 'default' },
})

const classes = computed(() => ({
  'n-button': true,
  'n-button-default': props.type === 'default',
  'n-button-primary': props.type === 'primary',
  'n-button-dashed': props.type === 'dashed',
}))
</script>

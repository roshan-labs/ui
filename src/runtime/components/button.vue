<template>
  <button :class="classes">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  type: { type: String, default: 'default' },
})

const classes = computed(() => ['btn', `btn-${props.type}`])
</script>

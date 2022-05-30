<template>
  <div class="n-space">
    <div v-for="(child, index) in childs" :key="index">
      <component :is="child" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, useSlots } from 'vue'

import { filterChildren } from '../utils/utils'

defineProps({
  /** 间距大小 */
  size: { type: [String, Number, Array], default: 'small' },
})

// Slot
const slots = useSlots()
const genChilds = () => filterChildren(slots.default?.())
const childs = ref(genChilds())
</script>

<style>
.n-space {
  @apply inline-flex;
}
</style>

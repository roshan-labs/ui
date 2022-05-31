<template>
  <div :class="classes">
    <div v-if="title" class="n-card-head">
      <div class="n-card-title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div class="n-card-body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  /** 卡片标题 */
  title: { type: String },
  /** 是否有边框 */
  bordered: { type: Boolean, default: true },
})

const classes = computed(() => ({
  'n-card': true,
  'n-card-bordered': props.bordered,
}))
</script>

<style>
.n-card {
  @apply bg-white rounded-base;
}

.n-card-bordered {
  @apply border-1 border-solid border-[rgba(0,0,0,0.06)];
}

.n-card-body {
  @apply p-lg;
}
</style>

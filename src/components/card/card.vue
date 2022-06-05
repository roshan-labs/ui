<template>
  <div :class="classes">
    <div v-if="title" class="n-card-head">
      <div class="n-card-head-wrapper">
        <div class="n-card-title">
          <slot name="title">{{ title }}</slot>
        </div>
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
  @apply text-base text-content leading-base bg-white rounded-base;
}

.n-card-bordered {
  @apply border-1 border-solid border-[rgba(0,0,0,0.06)];
}

.n-card-body {
  @apply p-lg;
}

.n-card-head {
  @apply text-lg font-medium px-lg;
}

.n-card-head-wrapper {
  @apply flex;
}

.n-card-title {
  @apply flex-1 py-md;
}
</style>

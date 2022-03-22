<template>
  <span :class="classes">
    <img v-if="src" :src="src" />
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

defineProps({
  /** 图片类头像的资源地址 */
  src: { type: String, default: '' },
})

const classes = computed(() => ({
  'n-avatar': true,
}))
</script>

<style>
.n-avatar {
  @apply inline-block;
}
</style>

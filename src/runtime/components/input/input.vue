<template>
  <input class="n-input" />
</template>

<script lang="ts" setup>
defineProps({
  /** 输入框内容 */
  moduleValue: { type: String, default: '' },
})
</script>

<style>
.n-input {
  @apply relative inline-block w-full text-base leading-base text-content py-4px px-11px border-1px border-solid border-base rounded-2px bg-white bg-none transition-all duration-300 ease hover:border-primary-5 focus:(border-primary-5 shadow-input outline-none);
}
</style>

<template>
  <input class="n-input" :value="moduleValue" @input="onInput" />
</template>

<script lang="ts" setup>
const props = defineProps({
  /** 输入框内容 */
  moduleValue: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style>
.n-input {
  @apply relative inline-block w-full text-base leading-base text-content py-4px px-11px border-1px border-solid border-base rounded-2px bg-white bg-none transition-all duration-300 ease outline-none hover:border-primary-5 focus:(border-primary-5 shadow-input);
}
</style>

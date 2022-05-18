<template>
  <div class="n-textarea">
    <textarea
      class="n-textarea-main"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  /** 输入框内容 */
  modelValue: { type: String, default: '' },
  /** 占位文本 */
  placeholder: { type: String, default: '' },
})

defineEmits(['update:modelValue'])
</script>

<style>
.n-textarea {
  @apply relative inline-block w-full text-base align-bottom;
}

.n-textarea-main {
  @apply block w-full text-content leading-base border border-solid border-base rounded px-[11px] py-[4px] bg-white bg-none outline-none transition-all duration-300 ease hover:border-primary-5 focus:border-primary-6;
}
</style>

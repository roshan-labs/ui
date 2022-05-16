<template>
  <div :class="classes">
    <div :class="wrapperClasses">
      <input
        :class="mainClasses"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed, ref } from 'vue'

import { Size } from '../utils/types'

const props = defineProps({
  /** 输入框内容 */
  modelValue: { type: String, default: '' },
  /** 控件大小 */
  size: { type: String as PropType<Size>, default: 'default' },
  /** 占位文本 */
  placeholder: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const classes = computed(() => ({
  'n-input': true,
  'n-input-large': props.size === 'large',
}))

const wrapperClasses = computed(() => ({
  'n-input-wrapper': true,
  'n-input-wrapper-small': props.size === 'small',
  'n-input-is-focus': isFocus.value,
}))

const mainClasses = computed(() => ({
  'n-input-main': true,
  'n-input-main-small': props.size === 'small',
  'n-input-main-large': props.size === 'large',
}))

const isFocus = ref(false)

const onFocus = (event: Event) => {
  isFocus.value = true
  emit('focus', event)
}

const onBlur = (event: Event) => {
  isFocus.value = false
  emit('blur', event)
}
</script>

<style>
.n-input {
  @apply inline-flex w-full text-base;
}

.n-input-large {
  @apply text-lg;
}

.n-input-wrapper {
  @apply inline-flex flex-grow border border-solid border-base rounded-[2px] px-[11px] transition-all duration-300 ease hover:border-primary-5;
}

.n-input-wrapper-small {
  @apply px-[7px];
}

.n-input-is-focus {
  @apply border-primary-6;
}

.n-input-main {
  @apply flex-grow h-[30px] text-content leading-base outline-none placeholder-shown:overflow-ellipsis;
}

.n-input-main-small {
  @apply h-[22px];
}

.n-input-main-large {
  @apply h-[38px];
}
</style>

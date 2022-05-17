<template>
  <div :class="classes">
    <textarea
      v-if="type === 'textarea'"
      class="n-textarea-main"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    ></textarea>
    <div v-else :class="wrapperClasses">
      <input
        :class="inputClasses"
        :value="modelValue"
        :placeholder="placeholder"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <div class="n-input-suffix">
        <n-icon class="n-input-clear">
          <close-circle />
        </n-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed, ref } from 'vue'

import { Size } from '../utils/types'
import NIcon from '../icon/icon.vue'
import CloseCircle from '~icons/ant-design/close-circle-filled'

const props = defineProps({
  /** 输入框内容 */
  modelValue: { type: String, default: '' },
  /** text、textarea 和其他原生 input type 值 */
  type: { type: String, default: 'text' },
  /** 控件大小 */
  size: { type: String as PropType<Size>, default: 'default' },
  /** 占位文本 */
  placeholder: { type: String, default: '' },
  /** type = textarea 有效，输入框行数 */
  rows: { type: Number, default: 2 },
  /** 可以点击清除图标删除内容 */
  allowClear: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const classes = computed(() => ({
  'n-input': props.type !== 'textarea',
  'n-textarea': props.type === 'textarea',
  'n-input-large': props.size === 'large',
}))

const wrapperClasses = computed(() => ({
  'n-input-wrapper': true,
  'n-input-wrapper-small': props.size === 'small',
  'n-input-is-focus': isFocus.value,
}))

const inputClasses = computed(() => ({
  'n-input-main': true,
  'n-input-main-small': props.size === 'small',
  'n-input-main-large': props.size === 'large',
}))

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement | HTMLTextAreaElement).value)
}

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
  @apply inline-flex flex-grow border border-solid border-base rounded px-[11px] transition-all duration-300 ease hover:border-primary-5;
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

.n-textarea {
  @apply inline-block w-full text-base align-bottom;
}

.n-textarea-main {
  @apply block w-full text-content leading-base border border-solid border-base rounded px-[11px] py-[4px] bg-white bg-none outline-none transition-all duration-300 ease hover:border-primary-5 focus:border-primary-6;
}

.n-input-suffix {
  @apply flex items-center;
}

.n-input-clear {
  @apply text-[#00000040] mx-xss cursor-pointer hover:text-[#00000073];
}
</style>

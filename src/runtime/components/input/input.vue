<template>
  <div :class="classes">
    <div v-if="addonBefore || $slots.addonBefore" class="n-input-addon">
      <slot name="addonBefore">{{ addonBefore }}</slot>
    </div>
    <div :class="wrapperClasses">
      <input
        :class="mainClasses"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <div v-if="suffixVisible" class="n-input-suffix">
        <n-icon class="n-input-clear" @click="$emit('update:modelValue', '')">
          <close-circle />
        </n-icon>
      </div>
    </div>
    <div v-if="addonAfter || $slots.addonAfter" class="n-input-addon">
      <slot name="addonAfter">{{ addonAfter }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed, ref, toRefs, useSlots, onUpdated } from 'vue'

import NIcon from '../icon/icon.vue'
import { Size } from '../utils/types'
import { useAllowClear } from './composables/use-allow-clear'
import CloseCircle from '~icons/ant-design/close-circle-filled'

const props = defineProps({
  /** 输入框内容 */
  modelValue: { type: String, default: '' },
  /** 原生 input type 值 */
  type: { type: String, default: 'text' },
  /** 控件大小 */
  size: { type: String as PropType<Size>, default: 'default' },
  /** 占位文本 */
  placeholder: { type: String, default: '' },
  /** 可以点击清除图标删除内容 */
  allowClear: { type: Boolean, default: false },
  /** 设置校验状态 */
  status: { type: String as PropType<'error' | 'warning'> },
  /** 带标签的 input，设置前置标签 */
  addonBefore: { type: String },
  /** 带标签的 input，设置后置标签 */
  addonAfter: { type: String },
  /** 是否有边框 */
  bordered: { type: Boolean, default: true },
  /** 是否禁用状态，默认为 false */
  disabled: { type: Boolean, default: false },
  /** 是否展示字数 */
  showCount: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const propsRef = toRefs(props)

// alowClear
const { clearVisible } = useAllowClear(propsRef.modelValue, propsRef.allowClear, emit)

const suffixVisible = computed(() => clearVisible.value)

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

// Focus event
const isFocus = ref(false)

const onFocus = (event: Event) => {
  isFocus.value = true
  emit('focus', event)
}

const onBlur = (event: Event) => {
  isFocus.value = false
  emit('blur', event)
}

// addonBefore, addonAfter
const slots = useSlots()
const hasAddonBefore = ref(Boolean(props.addonBefore || slots.addonBefore))
const hasAddonAfter = ref(Boolean(props.addonAfter || slots.addonAfter))

onUpdated(() => {
  hasAddonBefore.value = Boolean(props.addonBefore || slots.addonBefore)
  hasAddonAfter.value = Boolean(props.addonAfter || slots.addonAfter)
})

const classes = computed(() => ({
  'n-input': true,
  'n-input-large': props.size === 'large',
}))

const wrapperClasses = computed(() => ({
  'n-input-wrapper': true,
  'n-input-wrapper-small': props.size === 'small',
  'n-input-wrapper-large': props.size === 'large',
  'n-input-wrapper-disabled': props.disabled,
  'n-input-focus': isFocus.value,
  'n-input-error': props.status === 'error',
  'n-input-error-focus': props.status === 'error' && isFocus.value,
  'n-input-warning': props.status === 'warning',
  'n-input-warning-focus': props.status === 'warning' && isFocus.value,
  'n-input-addon-before': hasAddonBefore.value,
  'n-input-addon-after': hasAddonAfter.value,
  'n-input-borderless': !props.bordered,
}))

const mainClasses = computed(() => ({
  'n-input-main': true,
  'n-input-main-disabled': props.disabled,
}))
</script>

<style>
.n-input {
  @apply inline-flex w-full text-base text-content;
}

.n-input-large {
  @apply text-lg;
}

.n-input-wrapper {
  @apply inline-flex flex-grow border-1 border-solid border-base rounded-base px-[11px] py-[4px] transition-all duration-300 ease hover:border-primary-5;
}

.n-input-wrapper-small {
  @apply py-0;
}

.n-input-wrapper-large {
  @apply py-[6.5px];
}

.n-input-focus {
  @apply border-primary-5 shadow-input;
}

.n-input-main {
  @apply flex-grow leading-base outline-none placeholder-shown:overflow-ellipsis;
}

.n-input-suffix {
  @apply flex flex-none items-center;
}

.n-input-error {
  @apply border-error-base hover:border-error-base shadow-error-outline/20;
}

.n-input-error-focus {
  @apply border-error-hover hover:border-error-hover;
}

.n-input-warning {
  @apply border-warning-base hover:border-warning-base shadow-warning-outline/20;
}

.n-input-warning-focus {
  @apply border-warning-hover hover:border-warning-hover;
}

.n-input-addon {
  @apply flex items-center relative text-center border-1 border-solid border-base rounded-base bg-[#fafafa] px-[11px] first:(border-r-0 rounded-tr-none rounded-br-none) last:(border-l-0 rounded-tl-none rounded-bl-none);
}

.n-input-addon-before {
  @apply relative z-1 rounded-tl-none rounded-bl-none;
}

.n-input-addon-after {
  @apply relative z-1 rounded-tr-none rounded-br-none;
}

.n-input-borderless {
  @apply border-none shadow-none;
}

.n-input-wrapper-disabled {
  @apply text-[#00000040] bg-[#f5f5f5] cursor-not-allowed hover:border-base;
}

.n-input-main-disabled {
  @apply bg-transparent cursor-not-allowed;
}
</style>

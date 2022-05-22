<template>
  <div :class="classes">
    <div :class="wrapperClasses">
      <input
        class="n-input-main"
        :value="modelValue"
        :placeholder="placeholder"
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
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed, ref, toRefs } from 'vue'

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
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const propsRef = toRefs(props)

// alowClear
const { clearVisible } = useAllowClear(propsRef.modelValue, propsRef.allowClear, emit)

const classes = computed(() => ({
  'n-input': true,
  'n-input-large': props.size === 'large',
}))

const wrapperClasses = computed(() => ({
  'n-input-wrapper': true,
  'n-input-wrapper-small': props.size === 'small',
  'n-input-wrapper-large': props.size === 'large',
  'n-input-focus': isFocus.value,
}))

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
</script>

<style>
.n-input {
  @apply inline-flex w-full text-base;
}

.n-input-large {
  @apply text-lg;
}

.n-input-wrapper {
  @apply inline-flex flex-grow border border-solid border-base rounded px-[11px] py-[4px] transition-all duration-300 ease hover:border-primary-5;
}

.n-input-wrapper-small {
  @apply py-0;
}

.n-input-wrapper-large {
  @apply py-[6.5px];
}

.n-input-focus {
  @apply border-primary-6;
}

.n-input-main {
  @apply flex-grow text-content leading-base outline-none placeholder-shown:overflow-ellipsis;
}

.n-input-suffix {
  @apply flex items-center;
}

.n-input-clear {
  @apply text-[#00000040] mx-xss cursor-pointer transition-all duration-300 ease hover:text-[#00000073];
}
</style>

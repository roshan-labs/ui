<template>
  <div :class="classes" :data-count="countText">
    <textarea
      ref="textarea"
      v-model="value"
      :class="mainClasses"
      :style="textareaStyle"
      :rows="textareaRows"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @focus="$emit('blur', $event)"
      @blur="$emit('blur', $event)"
      @keypress.enter="$emit('enter', $event)"
    ></textarea>
    <n-icon v-if="clearVisible" class="n-input-clear n-textarea-clear" @click="onClear">
      <close-circle />
    </n-icon>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, PropType } from 'vue'
import { useVModel } from '@vueuse/core'

import NIcon from '../icon/icon.vue'
import { Autosize } from './utils'
import { useAllowClear } from './composables/use-allow-clear'
import { useAutoSize } from './composables/use-auto-size'
import CloseCircle from '~icons/ant-design/close-circle-filled'

const props = defineProps({
  /** 输入框内容 */
  modelValue: { type: String, default: '' },
  /** 占位文本 */
  placeholder: { type: String, default: '' },
  /** 输入框行数 */
  rows: { type: Number, default: 2 },
  /** 可以点击清除图标删除内容 */
  allowClear: { type: Boolean, default: false },
  /** 是否有边框 */
  bordered: { type: Boolean, default: true },
  /** 内容最大长度 */
  maxlength: { type: Number },
  /** 是否展示字数 */
  showCount: { type: Boolean, default: false },
  /** 自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 } */
  autosize: { type: [Boolean, Object] as PropType<Autosize>, default: false },
  /** 设置校验状态 */
  status: { type: String as PropType<'error' | 'warning'> },
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'enter'])

const value = useVModel(props, 'modelValue', emit, { passive: true })
const propsRef = toRefs(props)

const { clearVisible, onClear } = useAllowClear(value, propsRef.allowClear, emit)
const { textarea, textareaStyle } = useAutoSize(value, propsRef.autosize)
const textareaRows = computed(() => (props.autosize ? undefined : props.rows))

// showCount
const countText = computed(() => {
  if (props.showCount) {
    return typeof props.maxlength === 'number'
      ? `${value.value.length} / ${props.maxlength}`
      : value.value.length
  }

  return ''
})

// Styles
const classes = computed(() => ({
  'n-textarea': true,
  'n-textarea-show-count': props.showCount,
}))

const mainClasses = computed(() => ({
  'n-textarea-main': true,
  'n-textarea-borderless': !props.bordered,
  'n-textarea-error': props.status === 'error',
  'n-textarea-warning': props.status === 'warning',
}))
</script>

<style>
.n-textarea {
  @apply relative inline-block w-full text-base align-bottom;
}

.n-textarea-show-count {
  @apply after:(content-[attr(data-count)] absolute top-full right-0 text-[#00000073] whitespace-nowrap);
}

.n-textarea-main {
  @apply block w-full min-h-base text-content leading-base border border-solid border-base rounded px-[11px] py-[4px] bg-white bg-none outline-none transition-input duration-300 ease hover:border-primary-5 focus:(border-primary-5 shadow-input);
}

.n-textarea-clear {
  @apply absolute top-[8px] right-[8px] z-1;
}

.n-textarea-borderless {
  @apply border-none focus:shadow-none;
}

.n-textarea-error {
  @apply border-error-base hover:border-error-base focus:(border-error-hover shadow-input-error);
}

.n-textarea-warning {
  @apply border-warning-base hover:border-warning-base focus:(border-warning-hover shadow-input-warning);
}
</style>

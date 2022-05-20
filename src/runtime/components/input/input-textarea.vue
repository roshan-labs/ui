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
    ></textarea>
    <n-icon
      v-if="clearVisible"
      class="n-input-clear n-textarea-clear"
      @click="$emit('update:modelValue', '')"
    >
      <close-circle />
    </n-icon>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, PropType } from 'vue'
import { useVModel } from '@vueuse/core'

import NIcon from '../icon/icon.vue'
import { AutoSize } from './utils'
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
  autoSize: { type: [Boolean, Object] as PropType<AutoSize>, default: false },
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const value = useVModel(props, 'modelValue', emit, { passive: true })

const propsRef = toRefs(props)
const { clearVisible } = useAllowClear(value, propsRef.allowClear)
const { textarea, textareaStyle } = useAutoSize(value, propsRef.autoSize)
const textareaRows = computed(() => (props.autoSize ? undefined : props.rows))

const classes = computed(() => ({
  'n-textarea': true,
  'n-textarea-show-count': props.showCount,
}))

const mainClasses = computed(() => ({
  'n-textarea-main': true,
  'n-textarea-borderless': !props.bordered,
}))

const countText = computed(() => {
  if (props.showCount) {
    return typeof props.maxlength === 'number'
      ? `${value.value.length} / ${props.maxlength}`
      : value.value.length
  }

  return ''
})
</script>

<style>
.n-textarea {
  @apply relative inline-block w-full text-base align-bottom;
}

.n-textarea-show-count {
  @apply after:(content-[attr(data-count)] absolute top-full right-0 text-[#00000073] whitespace-nowrap);
}

.n-textarea-main {
  @apply block w-full text-content leading-base border border-solid border-base rounded px-[11px] py-[4px] bg-white bg-none outline-none transition-input duration-300 ease hover:border-primary-5 focus:(border-primary-5 shadow-input);
}

.n-textarea-clear {
  @apply absolute top-[8px] right-[8px] z-1;
}

.n-textarea-borderless {
  @apply border-none focus:shadow-none;
}
</style>

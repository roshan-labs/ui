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
      :disabled="disabled"
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

import NIcon from '../icon/n-icon.vue'
import { Autosize } from './utils'
import { useAllowClear } from './composables/use-allow-clear'
import { useAutoSize } from './composables/use-auto-size'
import { useShowCount } from './composables/use-show-count'
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
  /** 是否禁用状态，默认为 false */
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'enter'])

const value = useVModel(props, 'modelValue', emit, { passive: true })
const propsRef = toRefs(props)

const { clearVisible, onClear } = useAllowClear(value, propsRef.allowClear)
const { textarea, textareaStyle } = useAutoSize(value, propsRef.autosize)
const textareaRows = computed(() => (props.autosize ? undefined : props.rows))

// showCount
const { countText } = useShowCount(value, propsRef.showCount, propsRef.maxlength!)

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
  'n-textarea-disabled': props.disabled,
}))
</script>

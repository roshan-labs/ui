<template>
  <div :class="classes">
    <div v-if="addonBefore || $slots.addonBefore" class="n-input-addon">
      <slot name="addonBefore">{{ addonBefore }}</slot>
    </div>
    <div :class="wrapperClasses">
      <div v-if="prefix || $slots.prefix" :class="prefixClasses">
        <slot name="prefix">{{ prefix }}</slot>
      </div>
      <input
        ref="inputRef"
        v-model="value"
        :type="inputType"
        :class="mainClasses"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :disabled="disabled"
        @focus="onFocus"
        @blur="onBlur"
      />
      <div
        v-if="suffix || $slots.suffix || clearVisible || showCount || type === 'password'"
        class="n-input-suffix"
      >
        <n-icon
          v-if="clearVisible"
          class="n-input-suffix-item n-input-clear"
          :component="CloseCircle"
          @click="onClear"
        />
        <span v-if="showCount" class="n-input-suffix-item n-input-show-count">{{ countText }}</span>
        <n-icon
          v-if="type === 'password'"
          class="n-input-suffix-item n-input-password"
          :component="showPass ? EyeVisible : EyeInvisble"
          @click="toggleShowPass"
        />
        <slot name="suffix">{{ suffix }}</slot>
      </div>
    </div>
    <div v-if="addonAfter || $slots.addonAfter" class="n-input-addon">
      <slot name="addonAfter">{{ addonAfter }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, ref, toRefs, useSlots, onUpdated } from 'vue'
import { useVModel } from '@vueuse/core'

import NIcon from '../icon/n-icon.vue'
import { Size } from '../utils/types'
import { useAllowClear } from './composables/use-allow-clear'
import { useShowCount } from './composables/use-show-count'
import CloseCircle from '~icons/ant-design/close-circle-filled'
import EyeInvisble from '~icons/ant-design/eye-invisible-outlined'
import EyeVisible from '~icons/ant-design/eye-outlined'

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
  /** 最大输入长度 */
  maxlength: { type: Number },
  /** 是否展示字数 */
  showCount: { type: Boolean, default: false },
  /** 带有前缀图标的 input */
  prefix: { type: String },
  /** 带有后缀图标的 input */
  suffix: { type: String },
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const inputRef = ref<HTMLInputElement | null>(null)
const propsRef = toRefs(props)
const value = useVModel(props, 'modelValue', emit, { passive: true })

// alowClear
const { clearVisible, onClear } = useAllowClear(value, propsRef.allowClear)

// showCount
const { countText } = useShowCount(value, propsRef.showCount, propsRef.maxlength!)

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

// Password
const showPass = ref(false)

const toggleShowPass = () => {
  showPass.value = !showPass.value
}

// Type
const inputType = computed(() =>
  props.type === 'password' ? (showPass.value ? 'text' : 'password') : props.type
)

// Classes
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
  'n-input-warning': props.status === 'warning',
  'n-input-addon-before': hasAddonBefore.value,
  'n-input-addon-after': hasAddonAfter.value,
  'n-input-borderless': !props.bordered,
}))

const mainClasses = computed(() => ({
  'n-input-main': true,
  'n-input-main-disabled': props.disabled,
}))

const prefixClasses = computed(() => ({
  'n-input-prefix': true,
  [`n-input-prefix-${props.status}`]: !!props.status,
}))
</script>

<style>
input::-ms-reveal {
  display: none;
}
</style>

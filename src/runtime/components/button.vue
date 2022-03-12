<template>
  <button
    :class="classes"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'

const props = defineProps({
  /** 按钮类型 */
  type: {
    type: String as PropType<'default' | 'primary' | 'dashed' | 'text' | 'link'>,
    default: 'default',
  },
  /** 将按钮宽度调整为其父宽度的选项 */
  block: { type: Boolean, default: false },
  /** 设置危险按钮 */
  danger: { type: Boolean, default: false },
  /** 按钮失效状态 */
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])

const classes = computed(() => ({
  'n-button': true,
  'n-button-default': props.type === 'default',
  'n-button-primary': props.type === 'primary',
  'n-button-dashed': props.type === 'dashed',
  'n-button-text': props.type === 'text',
  'n-button-link': props.type === 'link',
  'n-button-block': props.block,
  'n-button-default-danger': props.danger && props.type === 'default',
  'n-button-primary-danger': props.danger && props.type === 'primary',
  'n-button-dashed-danger': props.danger && props.type === 'dashed',
  'n-button-text-danger': props.danger && props.type === 'text',
  'n-button-link-danger': props.danger && props.type === 'link',
}))

const onClick = () => {
  emit('click')
}
</script>

<style></style>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :class="classes"
    :href="href"
    :type="typeof href === 'string' ? null : htmlType"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </component>
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
  /** 幽灵属性，使按钮背景透明 */
  ghost: { type: Boolean, default: false },
  /** 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 */
  // eslint-disable-next-line vue/require-default-prop
  href: { type: String },
  /** 设置 button 原生 type 值 */
  htmlType: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button' },
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
  'n-button-default-ghost': props.ghost && props.type === 'default',
  'n-button-primary-ghost': props.ghost && props.type === 'primary',
  'n-button-dashed-ghost': props.ghost && props.type === 'dashed',
  'n-button-danger-ghost': props.ghost && props.danger,
}))

const onClick = () => {
  emit('click')
}
</script>

<style></style>

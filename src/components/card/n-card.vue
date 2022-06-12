<template>
  <div
    :class="[
      'text-base text-content leading-base bg-white rounded-base',
      bordered ? 'border-1 border-solid border-[rgba(0,0,0,0.06)]' : '',
    ]"
  >
    <div
      v-if="title || $slots.title"
      class="text-lg font-medium px-lg border-b border-solid border-[rgba(0,0,0,0.06)]"
    >
      <div class="flex-1 py-md">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div
      v-if="$slots.cover"
      class="mt-[-1px] mr-[-1px] ml-[-1px] overflow-hidden rounded-tr-base rounded-tl-base children:(block w-full)"
    >
      <slot name="cover" />
    </div>
    <div class="p-lg" :style="bodyStyle">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue'

interface Props {
  /** 卡片标题 */
  title?: string
  /** 是否有边框 */
  bordered: boolean
  /** 内容区域自定义样式 */
  bodyStyle?: StyleValue
}

withDefaults(defineProps<Props>(), {
  bordered: true,
})
</script>

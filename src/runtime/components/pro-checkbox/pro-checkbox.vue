<template>
  <el-checkbox-group v-bind="$attrs">
    <template v-for="option in options" :key="String(option.value)">
      <component :is="checkbox" v-bind="option" :label="option.value" :border="type === 'border'">
        {{ option.label }}
      </component>
    </template>
  </el-checkbox-group>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ElCheckboxGroup, ElCheckbox, ElCheckboxButton } from 'element-plus'
import { computed } from 'vue'

import type { ProCheckboxOption, ProCheckboxType } from './types'

const props = defineProps({
  /** 选项配置 */
  options: { type: Array as PropType<ProCheckboxOption[]>, default: () => [] },
  /** 类型：默认、按钮、带边框 */
  type: { type: String as PropType<ProCheckboxType>, default: 'default' },
})

const checkbox = computed(() =>
  ['default', 'border'].includes(props.type) ? ElCheckbox : ElCheckboxButton
)
</script>

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
import { ElCheckboxGroup, ElCheckbox, ElCheckboxButton } from 'element-plus'
import { computed } from 'vue'

import type { ProCheckboxOption, ProCheckboxType } from './types'

export interface Props {
  /** 多选框选项配置 */
  options?: ProCheckboxOption[]
  /** 风格类型：默认、按钮、带边框 */
  type?: ProCheckboxType
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  type: 'default',
})

const checkbox = computed(() =>
  ['default', 'border'].includes(props.type) ? ElCheckbox : ElCheckboxButton
)
</script>

<script lang="ts">
export default {
  name: 'ProCheckbox',
}
</script>

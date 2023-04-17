<template>
  <el-radio-group v-bind="$attrs">
    <template v-for="item in options" :key="String(item.value)">
      <component :is="radio" v-bind="item" :label="item.value" :border="type === 'border'">
        {{ item.label }}
      </component>
    </template>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElRadioGroup, ElRadio, ElRadioButton } from 'element-plus'

import type { ProRadioOption, ProRadioType } from './types'

export interface Props {
  /** 选项配置 */
  options?: ProRadioOption[]
  /** 类型：默认、按钮、带边框 */
  type?: ProRadioType
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  type: 'default',
})

const radio = computed(() => (['default', 'border'].includes(props.type) ? ElRadio : ElRadioButton))
</script>

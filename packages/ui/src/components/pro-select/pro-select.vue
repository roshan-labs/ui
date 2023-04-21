<template>
  <el-select v-bind="$attrs">
    <template v-for="item in options" :key="item.label">
      <el-option-group v-if="isOptionGroup(item)" v-bind="item">
        <el-option v-for="option in item.group" :key="option.label" v-bind="option">
          <slot v-if="$slots.default" v-bind="{ item: option }" />
        </el-option>
      </el-option-group>
      <el-option v-else v-bind="item">
        <slot v-if="$slots.default" v-bind="{ item }" />
      </el-option>
    </template>
  </el-select>
</template>

<script lang="ts" setup>
import { ElSelect, ElOptionGroup, ElOption } from 'element-plus'

import { isUndefined } from '../../utils'
import type { ProSelectOption, SelectGroup } from './types'

export interface Props {
  /** 选项配置 */
  options?: ProSelectOption[]
}

withDefaults(defineProps<Props>(), {
  options: () => [],
})

/** 判断是否为选项分组 */
const isOptionGroup = (value: any): value is SelectGroup => !isUndefined(value.group)
</script>

<script lang="ts">
export default {
  name: 'ProSelect',
}
</script>

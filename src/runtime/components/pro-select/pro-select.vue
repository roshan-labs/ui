<template>
  <el-select v-bind="$attrs">
    <template v-for="item in options" :key="item.label">
      <el-option-group v-if="isOptionGroup(item)" v-bind="item">
        <el-option v-for="option in item.group" :key="option.label" v-bind="option" />
      </el-option-group>
      <el-option v-else v-bind="item" />
    </template>
  </el-select>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ElSelect, ElOptionGroup, ElOption } from 'element-plus'

import { isUndefined } from '../../utils'
import type { ProSelectOption, SelectGroup } from './types'

defineProps({
  /** 选项配置 */
  options: { type: Array as PropType<ProSelectOption[]>, default: () => [] },
})

/** 判断是否为选项分组 */
const isOptionGroup = (value: any): value is SelectGroup => !isUndefined(value.group)
</script>

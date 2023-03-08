<template>
  <el-drawer v-model="visible" title="查看">
    <el-descriptions :column="1">
      <el-descriptions-item v-for="item in options" :key="item.label" :label="item.label">{{
        item.value
      }}</el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import { ElDrawer, ElDescriptions, ElDescriptionsItem, ElButton } from 'element-plus'

import type { ProCrudViewOption } from '../types'

const props = defineProps({
  /** 是否打开列设置 */
  modelValue: { type: Boolean },
  /** 数据查看选项 */
  options: { type: Array as PropType<ProCrudViewOption[]>, default: () => [] },
})

const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

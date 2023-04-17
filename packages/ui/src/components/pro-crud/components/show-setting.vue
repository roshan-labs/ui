<template>
  <el-drawer v-model="visible" class="pro-crud__setting">
    <template #header>
      <h1>列设置</h1>
    </template>
    <el-checkbox-group v-model="selected">
      <div v-for="column in columns" :key="column.prop">
        <el-checkbox :label="column.label">
          {{ column.label }}
        </el-checkbox>
      </div>
    </el-checkbox-group>
    <template #footer>
      <el-button>重置</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, computed } from 'vue'
import { ElDrawer, ElButton, ElCheckboxGroup, ElCheckbox } from 'element-plus'

import type { ProCrudColumn } from '../types'

const props = defineProps({
  /** 是否打开列设置 */
  modelValue: { type: Boolean },
  /** 列配置 */
  columns: { type: Array as PropType<ProCrudColumn[]>, default: () => [] },
})

const emit = defineEmits(['update:modelValue'])

const selected = ref<string[]>([])

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<style scoped></style>

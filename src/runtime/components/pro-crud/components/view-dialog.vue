<template>
  <el-drawer v-model="visible"></el-drawer>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElDrawer } from 'element-plus'

const props = defineProps({
  /** 是否打开列设置 */
  modelValue: { type: Boolean },
})

const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="p-[10px]">
    <el-button type="primary">Button</el-button>
    <pro-checkbox v-model="value" :options="options"></pro-checkbox>
    <el-radio-group>
      <el-radio label="1">1</el-radio>
      <el-radio label="2">2</el-radio>
    </el-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '#imports'
const options = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
]
const value = ref([])
</script>

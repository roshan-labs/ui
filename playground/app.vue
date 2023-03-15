<template>
  <div v-loading="loading" class="p-[10px]">
    {{ loading }}
    <div>
      <el-button type="primary" @click="loading = !loading">Button</el-button>
    </div>
    <pro-checkbox v-model="value" :options="options"></pro-checkbox>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '#imports'

const loading = ref(false)
const value = ref([])
const options = [
  { value: '0', label: '选项1' },
  { value: '1', label: '选项2' },
]
</script>

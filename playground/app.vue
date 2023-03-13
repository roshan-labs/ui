<template>
  <div class="p-[10px]">
    <el-button class="bg-black" type="primary">Button</el-button>
    <pro-checkbox :options="options"></pro-checkbox>
  </div>
</template>

<script lang="ts" setup>
const options = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
]
</script>

<template>
  <div class="p-[10px]">
    {{ loading }}
    <div>
      <el-button type="primary" @click="loading = !loading">Button</el-button>
    </div>
    <el-radio-group>
      <el-radio label="1">1</el-radio>
      <el-radio label="2">2</el-radio>
    </el-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '#imports'

const loading = ref(false)
</script>

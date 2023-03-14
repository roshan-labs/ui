<template>
  <div v-infinite-scroll class="p-[10px]">
    {{ loading }}
    <div>
      <el-button type="primary" @click="loading = !loading">Button</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '#imports'

const loading = ref(false)
</script>

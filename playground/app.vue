<template>
  <div class="w-[280px] p-[16px]">
    <n-input-textarea v-model="value" />
    <div>{{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
const value = ref('')
</script>

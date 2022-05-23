<template>
  <div class="w-[380px] p-lg">
    <n-input-textarea v-model="value" autosize show-count allow-clear />
  </div>
</template>

<script lang="ts" setup>
const value = ref('')
</script>

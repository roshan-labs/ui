<template>
  <div class="w-[380px] p-lg">
    <n-button class="mb-xs" @click="addon = 'http://'">change</n-button>
    <n-input v-model="value" allow-clear>
      <template #addonBefore>
        {{ addon }}
      </template>
    </n-input>
  </div>
</template>

<script lang="ts" setup>
const value = ref('')
const addon = ref('')
</script>

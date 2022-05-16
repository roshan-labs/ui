<template>
  <div class="w-[280px] p-[16px]">
    <n-input v-model="value" @input="onKeypress" />
    <div>{{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
const value = ref('')
const onKeypress = (e: any) => {
  console.log(e)
}
</script>

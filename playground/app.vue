<template>
  <n-button @click="onClick">button</n-button>
</template>

<script lang="ts" setup>
function onClick() {
  window.alert('hello world')
}
</script>

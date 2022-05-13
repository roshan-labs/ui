<template>
  <div>
    <n-button @click="change">switch</n-button>
    <n-layout class="h-[200px]">
      <n-layout-sider v-if="visible"></n-layout-sider>
    </n-layout>
  </div>
</template>

<script lang="ts" setup>
const visible = ref(true)

function change() {
  visible.value = !visible.value
}
</script>

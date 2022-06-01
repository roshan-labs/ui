<template>
  <div class="w-[380px] p-lg">
    <n-space>
      <n-button v-for="n in 5" :key="n" type="primary">Button</n-button>
    </n-space>
  </div>
</template>

<script lang="ts" setup></script>

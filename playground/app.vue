<template>
  <div>
    <pro-form :options="options"></pro-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from '#imports'

const options = ref([
  {
    prop: 'upload',
    label: 'Upload',
    type: 'upload',
    slots: {
      default: () => h('button', 'Upload'),
    },
  },
])
</script>

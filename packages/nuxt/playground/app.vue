<template>
  <watermark content="Roshan UI">
    <div class="h-screen p-2">
      <div class="flex">
        <el-button>Button</el-button>
        <pro-checkbox v-model="value" :options="options" />
      </div>
    </div>
  </watermark>
</template>

<script lang="ts" setup>
import type { ProCheckboxOption } from '@roshan-ui/ui'
import { ref } from '#imports'

const value = ref([])

const options: ProCheckboxOption[] = [
  { value: '0', label: '选项1' },
  { value: '1', label: '选项2' },
  { value: '2', label: '选项3' },
]
</script>

<template>
  <div>
    <pro-form :model-value="model" :options="options" @update:model-value="onUpdate"></pro-form>
    {{ model }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from '#imports'

const model = ref({ 0: 'text' })
const options = [
  { prop: '0', type: 'input' },
  { prop: '1', type: 'input' },
]

const onUpdate = (value: any) => {
  console.log('change')
  model.value = value
}
</script>

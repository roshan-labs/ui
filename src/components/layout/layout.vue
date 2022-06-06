<template>
  <section :class="classes">
    <slot />
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUpdated, ref, useSlots } from 'vue'

import { filterChildren, isComponent } from '../utils/utils'

const props = defineProps({
  /** 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 */
  hasSider: { type: Boolean, default: false },
})

/** hasSider 对应私有变量 */
const hasSider = ref(false)
const slots = useSlots()

function checkSider() {
  if (slots.default) {
    return filterChildren(slots.default()).some(
      (item) => isComponent(item.type) && item.type.name === 'LayoutSider'
    )
  }

  return false
}

const classes = computed(() => ({
  'n-layout': true,
  'n-layout-has-sider': props.hasSider || hasSider.value,
}))

onMounted(() => {
  hasSider.value = checkSider()
})

onUpdated(() => {
  hasSider.value = checkSider()
})
</script>

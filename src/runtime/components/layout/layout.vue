<template>
  <section :class="classes">
    <slot />
  </section>
</template>

<script lang="ts" setup>
import { computed, onBeforeUpdate, ref, useSlots } from 'vue'

import { filterChildren, isComponent } from '../utils/utils'

const props = defineProps({
  /** 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 */
  hasSider: { type: Boolean, default: false },
})

const checkSider = () =>
  filterChildren(useSlots().default()).some(
    (item) => isComponent(item.type) && item.type.name === 'LayoutSider'
  )
/** hasSider 对应私有变量 */
const _hasSider = ref(checkSider())

const classes = computed(() => ({
  'n-layout': true,
  'n-layout-has-sider': props.hasSider || _hasSider.value,
}))

onBeforeUpdate(() => {
  _hasSider.value = checkSider()
})
</script>

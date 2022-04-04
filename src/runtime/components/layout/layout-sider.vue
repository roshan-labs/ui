<template>
  <aside class="n-layout-sider" :style="style">
    <div class="n-layout-sider-children">
      <slot />
    </div>
    <div v-if="collapsible" class="n-layout-sider-trigger" :style="triggerStyle" @click="trigger">
      <n-icon>
        <icon-right v-if="reverseArrow ? !_collapsed : _collapsed" />
        <icon-left v-else />
      </n-icon>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue'
import { ref, computed, watch } from 'vue'

import { addUnit } from '../utils/utils'
import NIcon from '../icon/icon.vue'
import IconLeft from '~icons/ant-design/left-outlined'
import IconRight from '~icons/ant-design/right-outlined'

const props = defineProps({
  /** 宽度 */
  width: { type: [Number, String], default: 200 },
  /** 当前收起状态 v-model */
  collapsed: { type: Boolean },
  /** 收缩宽度，设置为 0 会出现特殊 trigger */
  collapsedWidth: { type: [Number, String], default: 80 },
  /** 是否可收起 */
  collapsible: { type: Boolean, default: false },
  /** 是否默认收起 */
  defaultCollapsed: { type: Boolean, default: false },
  /** 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用 */
  reverseArrow: { type: Boolean, default: false },
})

const emit = defineEmits(['update:collapsed'])

/** collapsed 内部同步变量 */
const _collapsed = ref(
  typeof props.collapsed === 'boolean' ? props.collapsed : props.defaultCollapsed
)
/** 组件宽度 */
const size = computed(() => addUnit(_collapsed.value ? props.collapsedWidth : props.width))

const style = computed<StyleValue>(() => ({
  flex: `0 0 ${size.value}`,
  minWidth: size.value,
  maxWidth: size.value,
  width: size.value,
}))
const triggerStyle = computed<StyleValue>(() => ({
  width: size.value,
}))

watch(
  () => props.collapsed,
  (newValue) => {
    _collapsed.value = newValue
  }
)

const trigger = () => {
  _collapsed.value = !_collapsed.value
  emit('update:collapsed', _collapsed.value)
}
</script>

<script lang="ts">
export default {
  name: 'LayoutSider',
}
</script>

<style>
.n-layout-sider-children {
  @apply h-full;
}

.n-layout-sider-trigger {
  @apply fixed bottom-0 z-1 flex items-center justify-center h-48px text-white bg-[#002140] cursor-pointer transition-all duration-200 ease;
}
</style>

<template>
  <aside class="n-layout-sider" :style="style">
    <div class="n-layout-sider-children">
      <slot />
    </div>
    <div
      v-if="collapsible"
      class="n-layout-sider-trigger"
      :style="triggerStyle"
      @click="trigger(!_collapsed)"
    >
      <slot name="trigger">
        <n-icon>
          <icon-right v-if="reverseArrow ? !_collapsed : _collapsed" />
          <icon-left v-else />
        </n-icon>
      </slot>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import type { PropType, StyleValue } from 'vue'
import { ref, computed, watch, watchEffect } from 'vue'
import { breakpointsAntDesign, useBreakpoints } from '@vueuse/core'

import { addUnit } from '../utils/utils'
import NIcon from '../icon/n-icon.vue'
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
  /** 触发响应式布局的断点 */
  // eslint-disable-next-line vue/require-default-prop
  breakpoint: { type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'> },
})

const emit = defineEmits(['update:collapsed', 'breakpoint'])

/** collapsed 内部同步变量 */
const _collapsed = ref(
  typeof props.collapsed === 'boolean' ? props.collapsed : props.defaultCollapsed
)
/** 组件宽度 */
const size = computed(() => addUnit(_collapsed.value ? props.collapsedWidth : props.width))

const breakpoints = useBreakpoints(breakpointsAntDesign)

watchEffect(() => {
  if (props.breakpoint) {
    const broken = !breakpoints[props.breakpoint].value

    emit('breakpoint', broken)
    trigger(broken)
  }
})

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

function trigger(value: boolean) {
  _collapsed.value = value
  emit('update:collapsed', value)
}
</script>

<script lang="ts">
export default {
  name: 'LayoutSider',
}
</script>

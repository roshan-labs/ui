<template>
  <el-tabs
    v-bind="$attrs"
    class="history-tabs"
    :model-value="active"
    :editable="false"
    :closable="history.length > 1"
    @tab-click="activeHistory"
    @tab-remove="removeHistory"
  >
    <el-tab-pane
      v-for="item in history"
      :key="item.path"
      :name="item.path"
      :label="isString(item.name) ? item.name : ''"
    />
  </el-tabs>
</template>

<script lang="ts" setup>
import type { RouteLocation } from 'vue-router'
import type { TabPaneName, TabsPaneContext } from 'element-plus'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElTabs, ElTabPane } from 'element-plus'
import { useVModel } from '@vueuse/core'

import { isString } from '../../utils'

export interface Props {
  /** 历史记录 */
  modelValue?: RouteLocation[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
})

const emit = defineEmits<{
  /** 更新历史记录 */
  (event: 'update:modelValue', value: RouteLocation[]): void
}>()

/** 当前激活的历史记录 */
const active = ref('')
const route = useRoute()
const router = useRouter()

const history = useVModel(props, 'modelValue', emit, { passive: true })

/** 激活选中的历史记录 */
const activeHistory = (pane: TabsPaneContext) => {
  if (!pane.active && pane.paneName) {
    router.push(`${pane.paneName}`)
  }
}

/** 把历史记录从列表中移除 */
const removeHistory = (name: TabPaneName) => {
  const index = history.value.findIndex((item) => item.path === name)

  if (index > -1) {
    // 移除激活的历史记录才需要重新激活下一个记录
    if (history.value[index].path === active.value) {
      const lastHistory = history.value[history.value.length - 1]
      const nextActive = index - 1 < 0 ? lastHistory.path : history.value[index - 1].path

      active.value = nextActive
    }

    history.value = history.value.filter((item) => item.path !== name)
  }
}

// 路由变化时需要判断变化后的路由是否在历史记录中
// 并激活相应历史记录
watch(
  () => route.path,
  () => {
    const { path } = route

    if (props.modelValue.every((item) => item.path !== path)) {
      history.value = [...props.modelValue, route]
    }

    active.value = path
  },
  { immediate: true }
)
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style scoped>
.history-tabs.el-tabs--border-card :deep(.el-tabs__header) {
  border-color: transparent;
}

.history-tabs.el-tabs--border-card :deep(.el-tabs__content) {
  padding: 0;
}

.history-tabs.el-tabs--left,
.history-tabs.el-tabs--right {
  display: inline-block;
}

.history-tabs.el-tabs--left :deep(.el-tabs__header),
.history-tabs.el-tabs--right :deep(.el-tabs__header) {
  margin: 0;
}

.history-tabs.el-tabs--left :deep(.el-tabs__content),
.history-tabs.el-tabs--right :deep(.el-tabs__content) {
  display: none;
}

.history-tabs :deep(.el-tabs__header.is-left),
.history-tabs :deep(.el-tabs__header.is-right) {
  border-bottom: 0;
}

.history-tabs :deep(.el-tabs__nav-wrap.is-left) {
  margin-right: 0;
}

.history-tabs :deep(.el-tabs__nav-wrap.is-right) {
  margin-left: 0;
}
</style>

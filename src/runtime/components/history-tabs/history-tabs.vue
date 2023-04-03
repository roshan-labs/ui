<template>
  <el-tabs closable @tab-remove="removeHistory">
    <el-tab-pane
      v-for="item in modelValue"
      :key="item.path"
      :name="item.path"
      :label="isString(item.name) ? item.name : ''"
    />
  </el-tabs>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { RouteLocation } from 'vue-router'
import type { TabPaneName } from 'element-plus'
// import { useRoute } from 'vue-router'
import { ElTabs, ElTabPane } from 'element-plus'

import { isString } from '../../utils'

const props = defineProps({
  /** 历史记录 */
  modelValue: { type: Array as PropType<RouteLocation[]>, default: () => [] },
})

const emit = defineEmits(['update:modelValue'])

const removeHistory = (name: TabPaneName) => {
  const result = props.modelValue.filter((item) => item.path !== name)
  emit('update:modelValue', result)
}
</script>

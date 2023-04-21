<template>
  <el-select-v2 v-model="value" :options="options" filterable>
    <template #default="{ item }">
      <div>{{ item.label }}</div>
      <div>{{ item.value }}</div>
    </template>
  </el-select-v2>
</template>

<script lang="ts" setup>
import type { RouteRecordNormalized } from 'vue-router'
import { ref, computed } from 'vue'
import { ElSelectV2 } from 'element-plus'

export interface Props {
  /** 页面路由列表：Routes */
  routes?: RouteRecordNormalized[]
}

const props = withDefaults(defineProps<Props>(), {})

const value = ref('')

interface Option {
  value: string
  label: string
}

/** el-select-v2 options */
const options = computed(() => {
  let items: Option[] = []

  if (props.routes) {
    items = props.routes.map<Option>((item) => ({
      value: item.path,
      label: (item.name || item.meta.name || '未命名路由') as string,
    }))
  }

  return items
})
</script>

<script lang="ts">
export default {
  name: 'SearchPage',
}
</script>

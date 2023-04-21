<template>
  <pro-select
    v-bind="$attrs"
    v-model="select"
    popper-class="search-page-popper"
    :options="options"
    :placeholder="placeholder"
    filterable
    :filter-method="filterMethod"
    @change="onChange"
  >
    <template #default="{ item }">
      <!-- @slot 自定义选项插槽 -->
      <slot v-bind="{ item }">
        <div class="search-page-item-label">{{ item.label }}</div>
        <div class="search-page-item-value">{{ item.value }}</div>
      </slot>
    </template>
  </pro-select>
</template>

<script lang="ts" setup>
import type { RouteRecordNormalized } from 'vue-router'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { ProSelect } from '../pro-select'

export interface Props {
  /** 页面路由列表：Routes */
  routes?: RouteRecordNormalized[]
  /** 文本占位 */
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择',
})

const emit = defineEmits<{
  /** 选中值发生变化时触发 */
  (event: 'change', value: string): void
}>()

const select = ref('')
const keyword = ref('')
const router = useRouter()

interface Option {
  value: string
  label: string
}

/** el-select-v2 options */
const options = computed(() => {
  const routes = router.getRoutes()

  return routesToOptions(props.routes || routes).filter(
    ({ value, label }) => label.includes(keyword.value) || value.includes(keyword.value)
  )
})

const onChange = (value: string) => {
  router.push(value)
  select.value = ''
  emit('change', value)
}

/**
 * 路由列表转化为 pro-select options
 *
 * @param routes 路由列表
 */
const routesToOptions = (routes: RouteRecordNormalized[]) =>
  routes.map<Option>((item) => ({
    value: item.path,
    label: (item.name || item.meta.name || '未命名路由') as string,
  }))

const filterMethod = (value: string) => {
  keyword.value = value
}
</script>

<script lang="ts">
export default {
  name: 'SearchPage',
}
</script>

<style>
.search-page-popper .el-select-dropdown__item {
  height: auto;
  line-height: 1.7;
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>

<style scoped>
.search-page-item-label {
  font-weight: bold;
  color: var(--el-text-color-primary);
}

.search-page-item-value {
  font-size: 12px;
  color: var(--el-color-info);
}
</style>

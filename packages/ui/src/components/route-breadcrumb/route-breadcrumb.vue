<template>
  <el-breadcrumb v-bind="$attrs">
    <el-breadcrumb-item v-for="item in routes" :key="item.path" :to="item.path">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'

const route = useRoute()
const routes = computed(() => route.matched)
</script>

<script lang="ts">
export default {
  name: 'RouteBreadcrumb',
}
</script>

<template>
  <el-descriptions v-bind="$attrs"></el-descriptions>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ElDescriptions } from 'element-plus'

import type { ProDescriptionsColumn } from './types'

defineProps({
  /** 列表配置 */
  columns: { type: Array as PropType<ProDescriptionsColumn[]>, default: () => [] },
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

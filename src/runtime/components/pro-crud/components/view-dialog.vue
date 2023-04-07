<template>
  <el-drawer v-model="visible" title="查看">
    <pro-descriptions :columns="columns" :detail="row" :column="1" border />
    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import { ElDrawer, ElButton } from 'element-plus'
import { useVModel } from '@vueuse/core'

import type { ProCrudViewOption, Data } from '../types'
import type { ProDescriptionsColumn } from '../../pro-descriptions/types'
import ProDescriptions from '../../pro-descriptions/pro-descriptions.vue'

const props = defineProps({
  /** 是否打开列设置 */
  modelValue: { type: Boolean },
  /** 数据查看选项 */
  options: { type: Array as PropType<ProCrudViewOption[]>, default: () => [] },
  /** 需要查看的数据 */
  row: { type: Object as PropType<Data>, default: () => ({}) },
})

const emit = defineEmits(['update:modelValue'])

const visible = useVModel(props, 'modelValue', emit)

const columns = computed<ProDescriptionsColumn[]>(() =>
  props.options.map((item) => ({ prop: item.prop, label: item.label }))
)
</script>
